import { UiButton } from "@propertyme-coding-challenge/ui-button";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Form,
  Link,
  useActionData,
  useCatch,
  useTransition,
} from "@remix-run/react";
import type { ReactEventHandler } from "react";
import { useEffect, useState } from "react";
import { JokeDisplay } from "../../components/joke";

import { db } from "../../utils/db.server";
import { getUserId, requireUserId } from "../../utils/session.server";

function validateJokeContent(content: string) {
  if (content.length < 10) {
    return `That joke is too short`;
  }
}

function validateJokeName(name: string) {
  if (name.length < 3) {
    return `That joke's name is too short`;
  }
}

type FieldErrors = {
  name: string | undefined;
  content: string | undefined;
};

type ActionData = {
  formError?: string;
  fieldErrors?: FieldErrors;
  fields?: {
    name: string;
    content: string;
  };
};

const badRequest = (data: ActionData) => json(data, { status: 400 });

export const handle = { hydrate: true };

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const form = await request.formData();
  const name = form.get("name");
  const content = form.get("content");
  if (typeof name !== "string" || typeof content !== "string") {
    return badRequest({
      formError: `Form not submitted correctly.`,
    });
  }

  const fieldErrors: FieldErrors = {
    name: validateJokeName(name),
    content: validateJokeContent(content),
  };

  const fields = { name, content };
  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({ fieldErrors, fields });
  }

  const joke = await db.joke.create({
    data: { ...fields, jokesterId: userId },
  });

  return redirect(`/jokes/${joke.id}`);
};

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);
  if (!userId) {
    throw new Response("Unauthorized", { status: 401 });
  }
  return json({});
};

export default function NewJokeRoute() {
  const actionData = useActionData<ActionData>();

  const [name, setName] = useState<string>(actionData?.fields?.name || "");
  const [content, setContent] = useState<string>(
    actionData?.fields?.content || ""
  );
  const [fieldErrors, setFieldErrors] = useState<
    Partial<ActionData["fieldErrors"]>
  >(
    actionData?.fieldErrors || {
      name: "",
      content: "",
    }
  );
  const transition = useTransition();

  useEffect(() => {
    setName(actionData?.fields?.name || "");
    setContent(actionData?.fields?.content || "");
  }, [actionData]);

  if (transition.submission) {
    const name = transition.submission.formData.get("name");
    const content = transition.submission.formData.get("content");
    if (
      typeof name === "string" &&
      typeof content === "string" &&
      !validateJokeContent(content) &&
      !validateJokeName(name)
    ) {
      return (
        <JokeDisplay
          joke={{ name, content }}
          isOwner={true}
          canDelete={false}
        />
      );
    }
  }

  const handleOnChangeName: ReactEventHandler = (event) => {
    const target = event.target as HTMLTextAreaElement;
    const value = target?.value || "";
    setName(value);

    setFieldErrors((errors) => {
      if (!errors) {
        return;
      }
      errors.name = validateJokeName(value);
      return errors;
    });
  };

  const handleOnChangeContent: ReactEventHandler = (event) => {
    const target = event.target as HTMLTextAreaElement;
    const value = target?.value || "";
    setContent(value);

    setFieldErrors((errors) => {
      if (!errors) {
        return;
      }
      errors.content = validateJokeContent(value);
      return errors;
    });
  };

  return (
    <div>
      <p>Add your own hilarious joke</p>
      <Form method="post">
        <div>
          <label>
            Name:{" "}
            <input
              type="text"
              value={name}
              name="name"
              aria-invalid={Boolean(fieldErrors?.name) || undefined}
              aria-errormessage={fieldErrors?.name ? "name-error" : undefined}
              onChange={handleOnChangeName}
            />
          </label>
          {fieldErrors?.name ? (
            <p className="form-validation-error" role="alert" id="name-error">
              {fieldErrors.name}
            </p>
          ) : null}
        </div>
        <div>
          <label>
            Content:{" "}
            <textarea
              value={content}
              name="content"
              aria-invalid={Boolean(fieldErrors?.content) || undefined}
              aria-errormessage={
                fieldErrors?.content ? "content-error" : undefined
              }
              onChange={handleOnChangeContent}
            />
          </label>
          {fieldErrors?.content ? (
            <p
              className="form-validation-error"
              role="alert"
              id="content-error"
            >
              {fieldErrors.content}
            </p>
          ) : null}
        </div>
        <div>
          {actionData?.formError ? (
            <p className="form-validation-error" role="alert">
              {actionData.formError}
            </p>
          ) : null}
          <UiButton type="submit" className="button">
            Add
          </UiButton>
        </div>
      </Form>
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 401) {
    return (
      <div className="error-container">
        <p>You must be logged in to create a joke.</p>
        <Link to="/login">Login</Link>
      </div>
    );
  }
}

export function ErrorBoundary(error: Error) {
  console.error(error);
  return (
    <div className="error-container">
      Something unexpected went wrong. Sorry about that.
    </div>
  );
}
