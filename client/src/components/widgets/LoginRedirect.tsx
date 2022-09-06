import { useEffect, useState } from "preact/hooks";
import { parse } from "query-string";

export default function LoginRedirect() {
  const [error, setError] = useState(false);

  useEffect(() => {
    const { access_token } = parse(window.location.hash);
    if (typeof access_token !== "string") return;

    const login = async () => {
      const res = await fetch(
        `http://localhost:8000/api/login/${access_token}`,
        {
          credentials: "include",
        }
      );

      if (res.status === 200) window.location.href = "/home";
      else {
        setError(true);
        window.location.href = "/";
      }
    };

    login();
  }, []);

  return (
    <div className="flex flex-col h-full items-center justify-center">
      <div class="flex flex-col items-center">
        <h2 class="text-3xl">Logging in...</h2>
        <h3 class="text-2xl">Please Wait</h3>
        {error && (
          <span class="text-red-600 text-lg">
            Something went wrong, please try again in a bit
          </span>
        )}
      </div>
    </div>
  );
}
