export default function Logo() {
  return (
    <div className="flex-center gap-[10px]">
      <div
        id="pseudo-logo"
        className="h-[40px] w-[40px] rounded-full bg-red"
      ></div>
      <p className="accent-font text-[19px] leading-[100%] text-wrap max-w-[70px]">
        Legal solutions
      </p>
    </div>
  );
}
