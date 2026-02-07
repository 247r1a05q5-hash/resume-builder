import React, { useState, useEffect } from "react";
import { InputForm } from "./components/InputForm";
import { AnalysisResultView } from "./components/AnalysisResult.tsx";
import { analyzeResume } from "./services/geminiService";
import { AnalysisResult } from "./types";
import { SparklesIcon, ArrowPathIcon, SunIcon, MoonIcon } from "./components/ui/Icons";

const App: React.FC = () => {
  const [jd, setJd] = useState("");
  const [resume, setResume] = useState("");
  const [resumeFile, setResumeFile] = useState<{ name: string; mimeType: string; data: string } | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  // Initialize dark mode from system preference
  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  // Update HTML class for dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleAnalyze = async () => {
    // Check if either text is present OR a file is uploaded
    if (!jd.trim() || (!resume.trim() && !resumeFile)) {
      setError("Please provide both a Job Description and a Resume (Text or File).");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await analyzeResume(jd, { 
        text: resume, 
        file: resumeFile || undefined 
      });
      setResult(data);
    } catch (err) {
      setError("Failed to analyze resume. Please try again or check your input.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setJd("");
    setResume("");
    setResumeFile(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-200">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
              <SparklesIcon className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400">
              ATS Scanner AI
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
             {/* Dark Mode Toggle */}
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
            </button>

            <button
              onClick={handleReset}
              className="text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex items-center gap-1"
            >
              <ArrowPathIcon className="w-4 h-4" />
              New Scan
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8 min-h-[calc(100vh-140px)]">
          
          {/* Input Section */}
          <div className={`flex flex-col transition-all duration-500 ease-in-out ${result ? 'lg:w-1/3' : 'lg:w-full'}`}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-6 flex flex-col h-full transition-colors duration-200">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xs">1</span>
                Input Data
              </h2>
              
              <div className="flex-grow">
                 <InputForm 
                    jd={jd} 
                    setJd={setJd} 
                    resume={resume} 
                    setResume={setResume}
                    resumeFile={resumeFile}
                    setResumeFile={setResumeFile}
                    onAnalyze={handleAnalyze} 
                    loading={loading}
                 />
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
                {error && (
                  <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-lg flex items-center gap-2">
                     <span className="font-bold">Error:</span> {error}
                  </div>
                )}
                
                <button
                  onClick={handleAnalyze}
                  disabled={loading || !jd || (!resume && !resumeFile)}
                  className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transform transition-all duration-200 
                    ${loading 
                      ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white hover:scale-[1.02] hover:shadow-indigo-500/25'
                    }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Analyzing...
                    </span>
                  ) : (
                    "Run ATS Scan"
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Result Section */}
          {result && (
            <div className="lg:w-2/3 animate-slideIn">
               <div className="bg-gray-50 dark:bg-gray-900 h-full flex flex-col transition-colors duration-200">
                  <div className="flex items-center justify-between mb-4">
                     <h2 className="text-xl font-bold flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 flex items-center justify-center text-sm">2</span>
                      Analysis Report
                    </h2>
                    <span className="text-xs font-mono text-gray-400">Powered by Gemini 2.0</span>
                  </div>
                  <AnalysisResultView result={result} />
               </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
