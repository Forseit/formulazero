import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const feedbackDirectory = path.join(process.cwd(), "data");
const feedbackFilePath = path.join(feedbackDirectory, "feedback-submissions.json");

function validateFeedback(payload) {
  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const organization =
    typeof payload.organization === "string" ? payload.organization.trim() : "";
  const interest = typeof payload.interest === "string" ? payload.interest.trim() : "";
  const message = typeof payload.message === "string" ? payload.message.trim() : "";

  if (!name || name.length < 2) {
    return { error: "Укажите имя длиной не меньше двух символов." };
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Укажите корректный email для обратной связи." };
  }

  if (!message || message.length < 20) {
    return { error: "Сообщение должно содержать не меньше 20 символов." };
  }

  return {
    entry: {
      name,
      email,
      organization,
      interest,
      message
    }
  };
}

async function readExistingFeedback() {
  try {
    const fileContents = await readFile(feedbackFilePath, "utf8");
    const parsed = JSON.parse(fileContents);

    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") {
      return [];
    }

    throw error;
  }
}

export async function POST(request) {
  try {
    const payload = await request.json();
    const validation = validateFeedback(payload);

    if ("error" in validation) {
      return NextResponse.json(
        {
          message: validation.error
        },
        { status: 400 }
      );
    }

    const existingFeedback = await readExistingFeedback();
    const entry = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      ...validation.entry
    };

    await mkdir(feedbackDirectory, { recursive: true });
    await writeFile(
      feedbackFilePath,
      JSON.stringify([...existingFeedback, entry], null, 2),
      "utf8"
    );

    return NextResponse.json({
      message: "Запрос принят. Представительство Formula 0 может продолжить обработку."
    });
  } catch (error) {
    console.error("Feedback route failed:", error);

    return NextResponse.json(
      {
        message: "Не удалось сохранить запрос. Повторите попытку позже."
      },
      { status: 500 }
    );
  }
}
