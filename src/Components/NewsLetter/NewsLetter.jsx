import { useState } from "react";
import { toast } from "react-hot-toast";
import "./newsLetter.css";
import women from "./women.png";

export default function NewsLetter() {
  const [email, setEmail] = useState("");

  const handleEmail = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
      return toast.error("Please Provide Email");
    }

    if (!emailRegex.test(email)) {
      return toast.error("Email format is invalid");
    }
    try {
      toast.loading("Checking Email...");
      const response = await fetch(
        "https://devin-vogue-api.vercel.app/sendEmail",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      if (response.ok) {
        toast.dismiss();
        const data = await response.json();
        toast.success("Please Check Your Email");
        console.log(data);
        setEmail("");
      } else {
        toast.dismiss();
        toast.error("Email Format Is Invalid");
      }
    } catch (err) {
      console.log(err);
      toast.error("Please Try Again Later");
    }
  };

  return (
    <div className="newsLetter-main flex px-8 mt-44 select-none">
      {/* Left */}
      <div className="left flex flex-col   gap-4">
        <div className="text-2xl font-semibold text-gray-200">
          <p className="news-letter-heading text-[#1B2834]">Our Newsletter</p>
        </div>
        <p className="newsLetter-body text-[#1B2834] leading-tight  text-2xl">
          Subscribe to Our Newsletter for Latest News on Our Upcoming Collection
        </p>
        <span className="news-letter-Subtitle text-gray-400">
          Get 20% off on your first order just by subscribing to our newsletter
        </span>
        <div className="user-input w-[30rem] flex flex-col gap-2">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your business email"
            type="email"
            className="news-letter-input w-full rounded-md focus:outline-none border-2 border-gray-500 bg-gray-200 h-14  text-center"
          />
          <button
            onClick={handleEmail}
            className="news-letter-btn h-12 w-full active:scale-95 whitespace-nowrap rounded-md text-white  bg-[#1B2834]"
          >
            Get started
          </button>
        </div>
      </div>

      {/* Right */}
      <div className="right">
        <img
          className="newsLetter-img hero-img h-96 w-96 "
          src={women}
          alt=""
        />
      </div>
    </div>
  );
}
