"use client";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Page() {
  return (
    <>
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
    </>
  );
}
