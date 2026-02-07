export interface AnalysisResult {
  matchScore: number;
  verdict: string;
  scoreReasoning: string;
  missingKeywords: string[];
  redFlags: string[];
  growthRoadmap: string[];
  interviewPrep: {
    question: string;
    reasoning: string;
  }[];
}

export interface AnalysisRequest {
  jobDescription: string;
  resumeText: string;
}