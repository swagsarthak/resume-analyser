import {type FormEvent, useState} from 'react'
import Navbar from "~/components/Navbar";
import FileUploader from "~/components/FileUploader";

const Upload = () => {
    const [isProcessing, setIsProcessing] = useState(true);
    const [statusText, setstatusText] = useState('');
    const [file, setFile] = useState<File | null>(null);


    const handleFileSelect = (file: File | null) => {
        setFile(file);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);

        const companyName = formData.get('company-name');
        const jobTitle = formData.get('job-title');
        const jobDescription = formData.get('job-description');

        console.log({
            companyName, jobTitle, jobDescription, file,
        });

    };
    return (
        <main className="bg-[url('/images/bg-main.svg')] bg-cover" >
            <Navbar />
            <section className="main-section">
                <div className="page-heading py-16">
                    <h1>Smart feedback for your job</h1>
                    {isProcessing ? (
                        <>
                            <h2>{statusText}</h2>
                            <img src="/images/resume-scan.gif" className="w-full" />
                        </>
                    ):(
                        <h2>Drop your resume for an ATS score and improvement tips</h2>
                    )}
                    {isProcessing && (
                        <form id="upload-form" onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
                            <div className="form-div">
                                <label htmlFor="company-name"> Company Name</label>
                                <input type="text" name="company-name" placeholder="Company name" id="company-name" />
                            </div>
                            <div className="form-div">
                                <label htmlFor="job-title"> Job title</label>
                                <textarea rows={5} name="job-title" placeholder="Job Title" id="job-title" />
                            </div>
                            <div className="form-div">
                                <label htmlFor="job-description"> Job title</label>
                                <input type="text" name="job-description" placeholder="Job description" id="job-description" />
                            </div>
                            <div className="form-div">
                                <label htmlFor="uploader">Upload resume</label>
                                <FileUploader onFileSelect={handleFileSelect} />
                            </div>

                            <button className="primary-button" type="submit">
                                Analyse Resume
                            </button>
                        </form>
                    )}
                </div>
            </section>
        </main>
    )
}
export default Upload
