import { useState } from "react";
import { Link } from "react-router-dom";
import { FaRobot, FaShieldAlt, FaChartBar } from "react-icons/fa";
import { IoMdSpeedometer } from "react-icons/io";

function Home() {
  const [activeFeature, setActiveFeature] = useState(null);
  console.log(activeFeature);
  const features = [
    {
      icon: FaRobot,
      title: "AI-Powered",
      description: "Leverage advanced AI for insightful analysis",
      color: "text-[#214e82]"
    },
    {
      icon: FaShieldAlt,
      title: "Incognito",
      description: "Provide feedback anonymously and securely.",
      color: "text-[#3e3e65]"
    },
    {
      icon: FaChartBar,
      title: "Deep Analytics",
      description: "Gain comprehensive insights from your feedback",
      color: "text-[#214e82]"
    },
    {
      icon: IoMdSpeedometer,
      title: "Rapid Results",
      description: "Get quick, actionable insights from your data",
      color: "text-[#3e3e65]"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-[#e6f0f9] text-gray-900">
      <header className="container mx-auto px-4 md:px-6 py-2 md:py-5 flex justify-between items-center border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <FaRobot className="text-[#214e82]" size={36} />
          <h1 className="text-2xl md:text-3xl font-bold text-[#214e82]">
            FeedBacks
          </h1>
        </div>
        <nav className="hidden md:flex space-x-4">
          <Link to="/signin">
            <button className="bg-[#214e82] text-white px-4 py-2 md:px-5 md:py-2 rounded-full hover:bg-[#2e61a8] transition">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="border border-[#214e82] text-[#214e82] px-4 py-2 md:px-5 md:py-2 rounded-full hover:bg-[#3e3e65] hover:text-white hover:border-[#3e3e65] transition">
              Sign up
            </button>
          </Link>
        </nav>
      </header>

      <main className="container mx-auto px-4 md:px-6 py-4 md:py-16">
        <section className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 md:mb-6 text-[#214e82]">
            Streamline Feedback Collection
          </h2>
          <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto mb-8 md:mb-12">
            Harness cutting-edge AI and privacy technologies to transform how
            organizations gather, analyze, and understand feedback.
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-4 md:p-6 
                  transform transition duration-300 hover:shadow-xl 
                  hover:border-[#214e82] hover:scale-105"
                onMouseEnter={() => setActiveFeature(index)}
                onMouseLeave={() => setActiveFeature(null)}
              >
                <div className={`mb-4 ${feature.color}`}>
                  <feature.icon size={36} className="mx-auto" />
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-[#214e82]">
                  {feature.title}
                </h3>
                <p className="text-sm md:text-base text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-[1px] md:mt-12 flex justify-center">
          <Link to="/signin">
            <button
              className="flex items-center bg-[#214e82] text-white 
                px-6 py-3 md:px-8 md:py-4 rounded-full hover:bg-[#2e61a8] 
                transition transform hover:scale-105 text-base md:text-lg"
            >
              Start Your Intelligent Feedback Journey
            </button>
          </Link>
        </div>
      </main>

      <footer className="container mx-auto px-4 md:px-6 py-2 md:py-8 text-center border-t">
        <p className="text-sm md:text-base text-gray-500">
          © 2024 IntelliForm. Intelligent Feedback Redefined.
        </p>
      </footer>
    </div>
  );
}

export default Home;
