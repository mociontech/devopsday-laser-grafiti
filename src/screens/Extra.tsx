import { useState } from "react";
import LightFrame from "../components/LightFrame";
import { asset } from "../lib/asset";
import { Registros, mensajeDe, type Persona } from "../lib/api";

interface Props {
  persona: Persona;
  onTerminar: (persona: Persona | null) => void;
}

const LIENZOS = [
  { id: "pulse", nombre: "Pulse Data Intelligence", img: "logo-pulse.png", x: 248, y: 471.2, w: 396.6, h: 223.1 },
  { id: "devops", nombre: "DevOps Days Bogotá 2026", img: "logo-devops.png", x: 695.9, y: 471, w: 396.6, h: 223.3 },
  { id: "evius", nombre: "Evius by Mocion", img: "logo-evius.png", x: 1131, y: 473, w: 396.9, h: 223.3 },
  { id: "connect", nombre: "Connect", img: "logo-connect.png", x: 459, y: 737, w: 396.6, h: 223.3 },
  { id: "mocion", nombre: "Powered by Mocion", img: "logo-mocion.png", x: 890, y: 737, w: 396.9, h: 223.1 },
];

/** Láser Grafiti: la persona elige su lienzo y se guarda en su participación. */
export default function Extra({ persona, onTerminar }: Props) {
  const [elegido, setElegido] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState("");

  async function elegir(id: string) {
    if (enviando) return;
    setEnviando(true);
    setElegido(id);
    setError("");
    try {
      await Registros.actualizar(persona.id, { lienzo: id });
      onTerminar({ ...persona, lienzo: id });
    } catch (err) {
      setError(mensajeDe(err));
      setElegido(null);
      setEnviando(false);
    }
  }

  return (
    <LightFrame>
      <h1 className="title title--97" style={{ left: 487, top: 304, width: 946, height: 78 }}>
        Selecciona tu lienzo
      </h1>

      <div role="radiogroup" aria-label="Lienzo">
        {LIENZOS.map((l) => (
          <button
            key={l.id}
            type="button"
            role="radio"
            aria-checked={elegido === l.id}
            aria-label={l.nombre}
            className="lienzo"
            onClick={() => elegir(l.id)}
            style={{ left: l.x, top: l.y, width: l.w, height: l.h }}
          >
            <img src={asset(l.img)} alt="" />
          </button>
        ))}
      </div>

      <p className="form-error form-error--center" role="alert" style={{ left: 0, top: 1000, width: 1920 }}>
        {error}
      </p>
    </LightFrame>
  );
}
