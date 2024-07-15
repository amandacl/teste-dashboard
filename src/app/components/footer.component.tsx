export default function Footer() {
  return (
    <div className="fixed bottom-0 left-0 w-full h-35 gap-2 bg-gray-300 flex flex-col items-center justify-center">
      <h4>
        Developed by <strong>S2B</strong> and <strong>EngenhaDev</strong> with
        <div className="inline text-red-500"> ♥ </div>
        <strong>Versão:</strong> rev 0.1
      </h4>
      <div className="flex flex-row">
        <a href="/">
          <strong>Suporte</strong>
        </a>
        <div className="px-2">|</div>
        <a href="/">
          <strong>Manual</strong>
        </a>
      </div>
    </div>
  );
}
