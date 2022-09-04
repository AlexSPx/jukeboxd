import { useEffect, useState } from "preact/hooks";
import { parse } from "query-string";
import spotifyApi from "../../SpotifyApi";
import { setUser } from "../../SpotifyApi/store";

export default function LoginRedirect() {
  const [error, setError] = useState(false);

  useEffect(() => {
    const { access_token } = parse(window.location.hash);
    if (typeof access_token !== "string") return;

    const fetchUser = async () => {
      const user = await spotifyApi.fetchUser(access_token);
      if (!user) {
        setError(true);
        setTimeout(() => {
          window.location.href = "/";
        }, 3000);
        return;
      }

      setUser(user)
      window.location.href = "/home";
      
    };

    fetchUser();
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
