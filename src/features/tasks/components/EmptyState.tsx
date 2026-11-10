export function EmptyState() {
  return (
    <div className="glass flex flex-col items-center gap-4 rounded-2xl border border-dashed p-10 text-center">
      <svg
        aria-hidden
        width={120}
        height={120}
        viewBox="0 0 120 120"
        className="hidden [[data-look=aurora]_&]:block"
      >
        {/* Mond (Aurora) */}
        <path
          className="fill-accent/30 stroke-primary"
          d="M75 26a26 26 0 1 0 0 52 26 26 0 1 1 0-52z"
          strokeWidth={3}
          fillRule="evenodd"
        />
        {/* Drei Sterne, sie blinken sanft */}
        <circle className="fill-accent animate-pulse" cx={30} cy={30} r={4} />
        <circle className="fill-accent animate-pulse [animation-delay:300ms]" cx={96} cy={44} r={3} />
        <circle className="fill-accent animate-pulse [animation-delay:600ms]" cx={52} cy={88} r={3.5} />
      </svg>
      <p className="font-heading text-xl">Alles erledigt. Zeit für Kaffee.</p>
      <p className="text-muted-foreground">Tippe oben eine neue Aufgabe ein oder drücke N.</p>
    </div>
  )
}
