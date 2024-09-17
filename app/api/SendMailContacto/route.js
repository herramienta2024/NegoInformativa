import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { Celular, Asunto, CorreoElectronico, Descripcion, NombreCompleto } =
      await req?.json();

    // const transporter = nodemailer.createTransport(
    //  {
    //     auth: {
    //       apiKey: "ea8fe41951c8f281f5a68a692a224829",
    //       apiSecret: "7f0422136ee5f3fe1642819c49cacf88",
    //     },
    //   }
    // );

    const mensaje = {
      from: "laherramienta48@gmail.com",
      to: "jhonned01@gmail.com",
      subject: `🎉🥳 ¡Solicitud de contacto: ${CorreoElectronico} ! 🥳🎉`,
      text: "Hello",
      html: `
        <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
          <div style="background-color: #1f2020; padding: 20px; color: #ffffff; border-radius: 5px 5px 0 0;">
            <h1 style="margin-top: 0; font-size: 24px;">www.siqcap.com.pe</h1>
          </div>
          <div style="padding: 20px;">
            <p style="margin-bottom: 15px;">Hemos recibido una solicitud de contacto de un nuevo usuario que se contactó a través de la página principal.</p>
            <p style="margin-bottom: 15px;">A continuación, encontrarás los detalles proporcionados:</p>
            <ul style="list-style: none; padding: 0; margin-bottom: 15px;">
              <li style="margin-bottom: 10px;"><strong>Nombre Completo:</strong> ${NombreCompleto}</li>
              <li style="margin-bottom: 10px;"><strong>Asunto:</strong> ${Asunto}</li>

              <li style="margin-bottom: 10px;"><strong>Correo electrónico:</strong><a href='mailto:${CorreoElectronico}' style="color: #101c71; text-decoration: none;">${CorreoElectronico}</a></li>
              <li style="margin-bottom: 10px;"><strong>Celular:</strong> <a href='tel:+${Celular}' style="color: #101c71; text-decoration: none;">${Celular}</a></li>
              <li style="margin-bottom: 10px;"><strong>Mensaje:</strong> ${Descripcion}</li>
            </ul>
            <p style="margin-bottom: 0;">Por favor, ponte en contacto con el usuario lo antes posible para atender su solicitud.</p>
            <p style="margin-bottom: 0;">¡Gracias!</p>
          </div>
        </div>
      `,
    };

    // Envía el correo electrónico
    // const Info = await transporter.sendMail(mensaje);

    console.log("Info", Info);
    return NextResponse.json(
      {
        body: "Se envio con éxito",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { body: "Internal Server Error" },
      {
        status: 500,
      }
    );
  }
}
