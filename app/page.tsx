"use client";
import ThemeSwitcherBtn from "@/components/ThemeSwitcherBtn";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { loadDocuments, loadWithInputFile } from "@/functions/loadDoc";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import "filepond/dist/filepond.min.css";
import { Delete, File as FileIcon, Loader2 } from "lucide-react";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginFileEncode);

export default function Home() {
  const [output, setOutput] = useState<any>();
  const [question, setQuestion] = useState<string>("");
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const response = () => {
    setLoading(true);
    console.log("clicked");
    const filesUtf8 = filesToUtf8();
    console.log(files);
    const res = loadWithInputFile(filesUtf8, question);
    setOutput(res);
    setLoading(false);
  };

  const filesToUtf8 = () => {
    const filesUtf8 = files.map((file) => {
      const reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.onload = (evt) => {
        console.log(evt.target?.result);
      };
      return reader.result;
    });
    return filesUtf8;
  };
  return (
    <div>
      <ThemeSwitcherBtn />
      <div className="flex justify-center flex-col gap-4 mt-6 max-w-xl m-auto">
        <h1 className="text-2xl text-center font-bold mb-2">
          Benvenuto su <span className="text-blue-500">K-GPT</span> v0.1
        </h1>

        <FilePond
          allowMultiple={true}
          files={files}
          onupdatefiles={(fileItems) => {
            setFiles(fileItems.map((fileItem) => fileItem.file));
          }}
          className="my-8"
          labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
        />

        <Input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Chiedi pure..."
        />
        <Button onClick={response} disabled={!files || files.length === 0}>
          {loading ? <Loader2 className="animate-spin" /> : "Start"}
        </Button>
        <Card className="m-auto w-full p-3">
          <p>{output || "> Risposta"}</p>
        </Card>
      </div>
    </div>
  );
}
