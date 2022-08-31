import { useEffect } from "preact/hooks";
import { parse } from "query-string";

export default function LoginRedirect() {
  useEffect(() => {
    const { access_token } = parse(window.location.hash);
    if (!access_token) return;

    const fetchUser = async () => {
      const r = await fetch(`http://localhost:8000/api/login/${access_token}`);

      console.log(access_token);
    };

    fetchUser();
  }, []);

  return <div>Logging in...</div>;
}
