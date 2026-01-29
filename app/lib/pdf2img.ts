// @ts-expect-error - Vite resolves this to a URL string at build time
import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url";

export interface PdfConversionResult {
    imageUrl: string;
    file: File | null;
    error?: string;
}

let pdfjsLib: any = null;
let isLoading = false;
let loadPromise: Promise<any> | null = null;

async function loadPdfJs(): Promise<any> {
    if (pdfjsLib) return pdfjsLib;
    if (loadPromise) return loadPromise;

    isLoading = true;
    // @ts-expect-error - pdfjs-dist/build/pdf.mjs is not a module
    loadPromise = import("pdfjs-dist/build/pdf.mjs")
        .then((lib) => {
            const resolvedWorkerSrc =
                typeof workerSrc === "string"
                    ? workerSrc
                    : (workerSrc as { default?: string })?.default;
            if (!resolvedWorkerSrc) {
                throw new Error("Failed to resolve PDF.js worker URL.");
            }
            lib.GlobalWorkerOptions.workerSrc = resolvedWorkerSrc;
            pdfjsLib = lib;
            isLoading = false;
            return lib;
        })
        .catch((err) => {
            isLoading = false;
            throw err;
        });

    return loadPromise;
}

export async function convertPdfToImage(
    file: File
): Promise<PdfConversionResult> {
    if (file.type !== "application/pdf") {
        return {
            imageUrl: "",
            file: null,
            error: "Selected file is not a PDF.",
        };
    }
    try {
        const lib = await loadPdfJs();

        const arrayBuffer = await file.arrayBuffer();
        const pdf = await lib.getDocument({ data: arrayBuffer }).promise;
        if (!pdf.numPages) {
            return {
                imageUrl: "",
                file: null,
                error: "PDF has no pages.",
            };
        }
        const page = await pdf.getPage(1);

        const viewport = page.getViewport({ scale: 4 });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        if (!context) {
            return {
                imageUrl: "",
                file: null,
                error: "Canvas 2D context is not available.",
            };
        }

        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high";

        await page.render({ canvasContext: context, viewport }).promise;

        return new Promise((resolve) => {
            canvas.toBlob(
                (blob) => {
                    if (blob) {
                        // Create a File from the blob with the same name as the pdf
                        const originalName = file.name.replace(/\.pdf$/i, "");
                        const imageFile = new File([blob], `${originalName}.png`, {
                            type: "image/png",
                        });

                        resolve({
                            imageUrl: URL.createObjectURL(blob),
                            file: imageFile,
                        });
                    } else {
                        resolve({
                            imageUrl: "",
                            file: null,
                            error: "Failed to create image blob",
                        });
                    }
                },
                "image/png",
                1.0
            ); // Set quality to maximum (1.0)
        });
    } catch (err) {
        return {
            imageUrl: "",
            file: null,
            error: `Failed to convert PDF: ${err}`,
        };
    }
}
