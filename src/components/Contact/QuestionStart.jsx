const QuestionStart = () => {

  return (

    <div
      className="
        group
        rounded-3xl
        border
        border-gray-200
        bg-white/70
        p-10
        shadow-sm
        backdrop-blur-xl
        transition
        hover:-translate-y-2
        hover:shadow-xl
        dark:border-slate-800
        dark:bg-slate-900/70
      "
    >

      <div
        className="
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-2xl
          bg-sky-500/10
          text-2xl
        "
      >
        🚀
      </div>


      <h3
        className="
          mt-8
          text-3xl
          font-bold
          text-gray-900
          dark:text-white
        "
      >
        شروع همکاری
      </h3>


      <p
        className="
          mt-4
          leading-8
          text-gray-600
          dark:text-gray-300
        "
      >
        با چند سوال کوتاه نیازهای پروژه شما را بررسی می‌کنیم
        تا بهترین پیشنهاد را ارائه دهیم.
      </p>



      <button
        className="
          mt-8
          w-full
          rounded-xl
          bg-sky-500
          py-4
          font-semibold
          text-white
          transition
          hover:bg-sky-600
          hover:shadow-lg
          hover:shadow-sky-500/30
        "
      >
        شروع سوالات
      </button>


    </div>

  );

};


export default QuestionStart;