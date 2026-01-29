import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import {usePuterStore} from "~/lib/puter";
import {Link, useNavigate} from "react-router";
import {useEffect, useState} from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Hive resume" },
    { name: "description", content: "Personal ATS" },
  ];
}

export default function Home() {
  const { auth } = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);

  useEffect(() => {
    if(!auth.isAuthenticated) navigate('/auth?next=/');
  }, [auth.isAuthenticated])

  return <main className="bg-[url('/images/bg-main.svg')] bg-cover" >
    <Navbar />
    {}
    <section className="main-section">
      <div className="page-heading">
        <h1>
          Track Application rating
        </h1>
        <h2>
          Review submissions & Check AI powered ratings
        </h2>
      </div>
        {resumes.length > 0 && (
            <div className="resumes-section">
              {resumes.map((resume) =>(
                  <ResumeCard key={resume.id} resume={resume} />
              ))}
            </div>
        )}

    </section>
  </main>
}
