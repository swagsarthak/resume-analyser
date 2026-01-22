import type { Route } from "./+types/home";
import {resumes} from "../../constants";
import ResumeCard from "~/components/ResumeCard";
import Navbar from "~/components/Navbar";
import {usePuterStore} from "~/lib/puter";
import {useLocation, useNavigate} from "react-router";
import {useEffect} from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Hive resume" },
    { name: "description", content: "Personal ATS" },
  ];
}

export default function Home() {
  const { auth } = usePuterStore();
  const navigate = useNavigate();

  useEffect(() => {
    if(auth.isAuthenticated) navigate('/auth?next=/');
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
      {resumes.map((resume) =>(
          <ResumeCard key={resume.id} resume={resume} />
      ))}
    </section>



  </main>
}
