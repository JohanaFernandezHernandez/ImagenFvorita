import { Card, Header } from "../../Components";
import "./HomePage.css";
import Flor from "../../assets/Flor.jpg";
import Flor2 from "../../assets/Flor2.avif";

export const HomePage = () => {
  return (
    <section className="container-card">
      <Card img={Flor} title="Hermosa Flor" />
      <Card img={Flor2} title="Hermosa Flor" />

      <Card img={Flor} title="Hermosa Flor" />

      <Card img={Flor} title="Hermosa Flor" />

      <Card img={Flor2} title="Hermosa Flor" />

      <Card img={Flor} title="Hermosa Flor" />

      <Card img={Flor} title="Hermosa Flor" />

      <Card img={Flor} title="Hermosa Flor" />

    </section>
  );
};
