"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import { useTheme } from "next-themes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
export default function Home() {
  const [username, setUsername] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null); // Thêm state error
  const [isLoading, setIsLoading] = useState(false); //  loading state
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  useEffect(() => {
    setTheme("light");
    // Thực hiện lệnh request khi component được tạo ra (mount)
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://api.github.com/users/nguyen2109`
        );
        const userData = response.data;
        setResult(userData);
      } catch (error) {
        setResult("Error fetching data.");
      }
    }

    fetchData();
  }, []); // Mảng rỗng [] đảm bảo useEffect chỉ chạy một lần khi component mount

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const cleanedUsername = username.replace(/\s+/g, "");
    if (!cleanedUsername) {
      setError("No result!!! Searching other name");
      setResult(null); // Reset result and error when submitting empty username
      return; // Thoát khỏi hàm ngay khi gửi tên người dùng trống
    }
    setIsLoading(true); // Bắt đầu tải
    try {
      const response = await axios.get(
        `https://api.github.com/users/${cleanedUsername}`
      );
      const userData = response.data;
      setResult(userData);
      setError(null);
    } catch (error) {
      setError("No result! Try other username");
      setResult(null);
      try {
        const responseFallback = await axios.get(
          "https://api.github.com/users/nguyen2109"
        );
        const userDataFallback = responseFallback.data;
        setResult(userDataFallback);
      } catch (fallbackError) {
        setError("Lỗi khi tải dữ liệu.");
      }
    } finally {
      setIsLoading(false); // Dừng tải
    }
  };
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const formatCreatedAt = (createdAt) => {
    return format(new Date(createdAt), "dd MMM yyyy");
  };

  return (
    <>
      <div class="container mx-auto px-8">
        <div class="mx-auto flex w-full p-2">
          <div class="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
            <h1 class="text-2xl font-bold ">Github API User</h1>
          </div>
          <button onClick={toggleTheme} class="ml-auto">
            {theme === "light" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-6 w-6 stroke-cyan-500 stroke-1 hover:fill-cyan-500"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-6 h-6 fill-yellow-500 stroke-yellow-500 stroke-1"
              >
                <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
              </svg>
            )}
          </button>
        </div>
        <form onSubmit={handleFormSubmit}>
          <div class="dark:bg-slate-700 mx-auto flex w-full max-w-xl items-center space-x-2 rounded-xl bg-white p-2 shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-6 w-6 stroke-cyan-500"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>

            <input
              type="text"
              class="dark:bg-slate-700 w-full overflow-ellipsis rounded border-none text-gray-500 placeholder-gray-400 focus:ring-0"
              placeholder="Type Github username"
              value={username}
              onChange={handleUsernameChange}
            />

            <button
              class=" mx-auto items-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2 text-white hover:from-pink-500 hover:to-yellow-500 "
              type="submit"
            >
              Search
            </button>
            {/* */}
          </div>
        </form>
        {error && (
          <div class="font-bold text-red-500 text-center mx-auto mt-6 max-w-xl space-x-2 rounded-xl bg-transfer p-4  ">
            {error}
          </div>
        )}
        {/* Hiển thị skeleton hoặc kết quả */}
        {isLoading ? ( // Hiển thị skeleton trong quá trình tải
          <div class="mx-auto mt-6 max-w-xl space-x-2 rounded-xl bg-white p-4 shadow-lg dark:bg-slate-700">
            <div class="grid grid-cols-1 sm:grid-cols-4">
              <div class="mx-auto justify-self-center">
                <Skeleton height={128} width={128} circle={true} />
              </div>
              <div class="col-span-3">
                <div class="mx-auto justify-self-center text-center sm:px-3 sm:text-left">
                  <Skeleton height={12} width={130} />
                </div>
                <div class="mx-auto justify-self-center text-center sm:px-3 sm:text-left">
                  <Skeleton height={12} width={80} />
                </div>
                <div class="mx-auto justify-self-center text-center sm:px-3 sm:text-left">
                  <Skeleton height={12} width={130} />
                </div>
                <div class="col-start-2 justify-self-center p-3 text-center sm:text-left">
                  <Skeleton height={12} count={3} />
                </div>
                <Skeleton height={48} />
              </div>
            </div>
          </div>
        ) : result ? (
          <div class="mx-auto mt-6 max-w-xl space-x-2 rounded-xl bg-white p-4 shadow-lg dark:bg-slate-700">
            <div class="grid grid-cols-1 sm:grid-cols-4">
              <div class="mx-auto justify-self-center">
                <img
                  src={result && result.avatar_url}
                  alt="Avatar"
                  class="h-32 w-32 rounded-full"
                />
              </div>
              <div class="col-span-3">
                <div class="mx-auto justify-self-center text-center sm:px-3 sm:text-left">
                  {result && result.name}
                </div>
                <div class="mx-auto justify-self-center text-center sm:px-3 sm:text-left">
                  <a class="text-blue-500" href={result && result.html_url}>
                    {" "}
                    {result && <span>@{result.login} </span>}
                  </a>
                </div>

                <div class="mx-auto justify-self-center px-3 text-center italic text-slate-500 sm:px-3 sm:text-left dark:text-white">
                  {result && (
                    <span>
                      Joined{" "}
                      {result.created_at && formatCreatedAt(result.created_at)}
                    </span>
                  )}
                </div>
                <div class="col-start-2 justify-self-center p-3 text-center sm:text-left sm:col-start-1">
                  {result && result.bio}
                </div>
                <div class="mx-auto rounded-lg bg-slate-50 p-3 shadow-lg dark:bg-slate-600">
                  <div class="grid grid-cols-3 grid-rows-2">
                    <div class="mx-auto text-xs sm:text-base">Repos</div>
                    <div class="mx-auto text-xs sm:text-base">Followers</div>
                    <div class="mx-auto text-xs sm:text-base">Following</div>
                    <div class="mx-auto text-xl font-bold">
                      {result && result.public_repos}
                    </div>
                    <div class="mx-auto text-xl font-bold">
                      {result && result.followers}
                    </div>
                    <div class="mx-auto text-xl font-bold">
                      {result && result.following}
                    </div>
                  </div>
                </div>
                <div class="grid grid-cols-1 grid-rows-4 gap-4 p-3 sm:grid-cols-2 sm:grid-rows-2">
                  <div
                    className={`flex ${
                      result?.location
                        ? "text-xs justify-self-center sm:justify-self-auto"
                        : " text-xs justify-self-center italic text-slate-400 sm:justify-self-auto"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      class="w-4 h-4"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                        clip-rule="evenodd"
                      />
                    </svg>

                    {result?.location || "Not Available"}
                  </div>
                  <div
                    className={`flex ${
                      result?.blog
                        ? "text-xs flex justify-self-center sm:ml-auto sm:justify-self-auto"
                        : "text-xs flex justify-self-center sm:ml-auto sm:justify-self-auto italic text-slate-400"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="h-4 w-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                      />
                    </svg>

                    <a
                      className={`${
                        result?.blog
                          ? " text-blue-500"
                          : " italic text-slate-400"
                      }`}
                      href={`${result?.blog ? `${result.blog}` : "#"}`}
                    >
                      {result?.blog || "Not Available"}
                    </a>
                  </div>
                  <div
                    className={`flex ${
                      result?.twitter_username
                        ? "text-xs flex justify-self-center sm:justify-self-auto"
                        : "text-xs flex justify-self-center sm:justify-self-auto italic text-slate-400"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      class="w-4 h-4"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M17.834 6.166a8.25 8.25 0 100 11.668.75.75 0 011.06 1.06c-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788 3.807-3.808 9.98-3.808 13.788 0A9.722 9.722 0 0121.75 12c0 .975-.296 1.887-.809 2.571-.514.685-1.28 1.179-2.191 1.179-.904 0-1.666-.487-2.18-1.164a5.25 5.25 0 11-.82-6.26V8.25a.75.75 0 011.5 0V12c0 .682.208 1.27.509 1.671.3.401.659.579.991.579.332 0 .69-.178.991-.579.3-.4.509-.99.509-1.671a8.222 8.222 0 00-2.416-5.834zM15.75 12a3.75 3.75 0 10-7.5 0 3.75 3.75 0 007.5 0z"
                        clip-rule="evenodd"
                      />
                    </svg>

                    <a
                      className={`${
                        result?.twitter_username
                          ? "text-blue-500"
                          : "italic text-slate-400"
                      }`}
                      href={`${
                        result?.twitter_username
                          ? `https://twitter.com/${result.twitter_username}`
                          : "#"
                      }`}
                    >
                      <p className="text-xs">
                        {result?.twitter_username || "Not Available"}
                      </p>
                    </a>
                  </div>
                  {/* <div class="flex justify-self-center italic text-slate-400 sm:ml-auto sm:justify-self-auto"> */}
                  <div
                    className={`flex ${
                      result?.company
                        ? "text-xs flex justify-self-center sm:ml-auto sm:justify-self-auto"
                        : "text-xs flex justify-self-center italic text-slate-400 sm:ml-auto sm:justify-self-auto"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      class="w-4 h-4"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M3 2.25a.75.75 0 000 1.5v16.5h-.75a.75.75 0 000 1.5H15v-18a.75.75 0 000-1.5H3zM6.75 19.5v-2.25a.75.75 0 01.75-.75h3a.75.75 0 01.75.75v2.25a.75.75 0 01-.75.75h-3a.75.75 0 01-.75-.75zM6 6.75A.75.75 0 016.75 6h.75a.75.75 0 010 1.5h-.75A.75.75 0 016 6.75zM6.75 9a.75.75 0 000 1.5h.75a.75.75 0 000-1.5h-.75zM6 12.75a.75.75 0 01.75-.75h.75a.75.75 0 010 1.5h-.75a.75.75 0 01-.75-.75zM10.5 6a.75.75 0 000 1.5h.75a.75.75 0 000-1.5h-.75zm-.75 3.75A.75.75 0 0110.5 9h.75a.75.75 0 010 1.5h-.75a.75.75 0 01-.75-.75zM10.5 12a.75.75 0 000 1.5h.75a.75.75 0 000-1.5h-.75zM16.5 6.75v15h5.25a.75.75 0 000-1.5H21v-12a.75.75 0 000-1.5h-4.5zm1.5 4.5a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008zm.75 2.25a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75v-.008a.75.75 0 00-.75-.75h-.008zM18 17.25a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <p className="text-xs">
                      {result?.company || "Not Available"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Hiển thị thông báo lỗi
          <div class="font-bold text-red-500 text-center mx-auto mt-6 max-w-xl space-x-2 rounded-xl bg-transfer p-4">
            {error}
          </div>
        )}
      </div>
    </>
  );
}
