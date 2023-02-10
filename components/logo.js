import Image from "next/image";
export default function Logo(props) {
  return (
    <div className="mx-auto w-full max-w-md flex flex-col justify-center items-center">
      <Image
        className="h-12 w-auto"
        src="/sdilogo.png"
        alt="Workflow"
        width={60}
        height={60}
      />
    </div>
  );
}
