import { Card, Header } from "../../Components";
import "./HomePage.css";
import Flor from "../../assets/Flor.jpg";
import Flor2 from "../../assets/Flor2.avif";
import { useConectionApi } from "../../hooks/useConextionApi";
import { useEffect, useState } from "react";

export const HomePage = () => {
  const[images, setImages] = useState([]);

  const {getImages} = useConectionApi();

  useEffect(() => {
    const fetchImage = async ()=> {
      const response = await getImages();
      setImages(response);
    }
    fetchImage();

  },[]);

  console.log(images);


  return (
    <section className="container-card">
      <Card img={Flor} title="Hermosa Flor" />
      <Card img={Flor2} title="Hermosa Flor" />

      <Card img={Flor} title="Hermosa Flor" />

    </section>
  );
};
