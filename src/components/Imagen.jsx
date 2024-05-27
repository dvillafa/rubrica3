const Imagen = ({ urlimg }) => {
  return (
    <div>
      <img className="img-fluid" src={urlimg} alt="Imagen" />
    </div>
  );
};

export default Imagen