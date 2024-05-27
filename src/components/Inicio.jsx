import Imagen from "./Imagen";

const Inicio = () => {
  return (
    <div className="container">
      <h1 className="text-center my-4">Bienvenido a Centro Deportivo Universitario CUC</h1>
      <div className="row">
        <div className="col-md-6 col-12 mb-4">
          <div className="card h-100">
            <Imagen urlimg="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiQpB-RRe4rV2obStpQu1FjFDL5mEkxqaQPrdYy_y-6Y0usLyO58WNWL1GlqNWpG46aPsrvGe0Vew6NCt0OQPBa30f5USk_Dzj7zdM3R3wbQ5C251QP9h0frrnC6qbhSWZSPh8L20sH8WY/s1600/DSC01612.jpg" altText="Futsal" />
            <div className="card-body">
              <h5 className="card-title">Futsal</h5>
              <p className="card-text">
                Reserva tu sala de futsal y vive la intensidad del juego. Nuestras instalaciones de calidad te esperan para entrenar, competir o disfrutar con amigos. ¡Haz tu reserva ahora y siente la pasión del futsal!
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12 mb-4">
          <div className="card h-100">
            <Imagen urlimg="https://i.pinimg.com/736x/23/1b/4a/231b4a0370618042d605a3f134ea5948.jpg" altText="Baloncesto" />
            <div className="card-body">
              <h5 className="card-title">Baloncesto</h5>
              <p className="card-text">
                Reserva tu cancha de baloncesto y experimenta la emoción del deporte. Disfruta de nuestras excelentes instalaciones para entrenar, competir o divertirte con amigos. ¡Reserva ahora y vive la magia del baloncesto!
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12 mb-4">
          <div className="card h-100">
            <Imagen urlimg="https://media.istockphoto.com/id/1443112735/es/foto/una-sala-de-voleibol-cubierta-vac%C3%ADa.jpg?s=612x612&w=0&k=20&c=Q_k-JfHnJe4zXeJqAZ14SSt9iVYI7f4zQ2ObWGDSe08=" altText="Voleibol" />
            <div className="card-body">
              <h5 className="card-title">Voleibol</h5>
              <p className="card-text">
                Reserva tu cancha de voleibol y sumérgete en la energía del juego. Aprovecha nuestras instalaciones de primer nivel para entrenar, competir o jugar con amigos. ¡Haz tu reserva hoy y disfruta del voleibol al máximo!
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12 mb-4">
          <div className="card h-100">
            <Imagen urlimg="https://www.diariodenavarra.es/uploads/2012/02/21/60b1d92676e4f.jpeg" altText="Padel" />

            <div className="card-body">
              <h5 className="card-title">Padel</h5>
              <p className="card-text">
                Reserva tu cancha de pádel y siente la adrenalina del partido. Disfruta de nuestras instalaciones premium para entrenar, competir o pasar un buen rato con amigos. ¡Reserva ya y vive la emoción del pádel!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inicio