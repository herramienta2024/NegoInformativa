import React from "react";
import TitleSection from "../TitleSection";

const AvisoLegal = () => {
  return (
    <div className="-mt-[84px] md:-mt-[96px] g:-mt-[91.09px] bg-gray-50 w-full h-full">
      <TitleSection title={`Aviso legal`} image="/Banners/BannerLegal.jpg" />

      <div className="container max-w-4xl mx-auto px-4 py-8">
        {/* <h1 className="text-3xl font-bold text-center mb-8">AVISO LEGAL</h1> */}

        <p className="text-xl font-semibold mb-4">
          BASE LEGAL Y ÁMBITO DE APLICACIÓN
        </p>
        <p className="mb-4">
          La Política de Privacidad y Protección de Datos Personales, se
          desarrolla en cumplimiento de los artículos 15 y 20 de la Constitución
          Política; de los artículos 17 literal k) y 18 literal f) de la Ley
          Estatutaria 1581 de 2012, por la cual se dictan disposiciones
          generales para la Protección de Datos Personales (LEPD); y del
          artículo 13 del Decreto 1377 de 2013, por el cual se reglamenta
          parcialmente la Ley anterior.
        </p>
        <p className="mb-4">
          Esta política será aplicable a todos los datos personales registrados
          en bases de datos que sean objeto de tratamiento por el responsable
          del tratamiento.
        </p>

        <p className="font-semibold mb-2">Autorización:</p>
        <p className="mb-4">
          Consentimiento previo, expreso e informado del Titular para llevar a
          cabo el tratamiento de datos personales.
        </p>

        <p className="font-semibold mb-2">Base de Datos:</p>
        <p className="mb-4">
          Conjunto organizado de datos personales que sea objeto de tratamiento.
        </p>

        <p className="font-semibold mb-2">Dato personal:</p>
        <p className="mb-4">
          Cualquier información vinculada o que pueda asociarse a una o varias
          personas naturales determinadas o determinables.
        </p>

        <p className="font-semibold mb-2">Dato público:</p>
        <p className="mb-4">
          Es el dato que no sea semiprivado, privado o sensible. Son
          considerados datos públicos, entre otros, los datos relativos al
          estado civil de las personas, a su profesión u oficio y a su calidad
          de comerciante o de servidor público. Por su naturaleza, los datos
          públicos pueden estar contenidos, entre otros, en registros públicos,
          documentos públicos, gacetas y boletines oficiales y sentencias
          judiciales debidamente ejecutoriadas que no estén sometidas a reserva.
        </p>

        <p className="font-semibold mb-2">Datos sensibles:</p>
        <p className="mb-4">
          Se entiende por datos sensibles aquellos que afectan la intimidad del
          Titular o cuyo uso indebido puede generar su discriminación, tales
          como aquellos que revelen el origen racial o étnico, la orientación
          política, las convicciones religiosas o filosóficas, la pertenencia a
          sindicatos, organizaciones sociales, de derechos humanos o que
          promueva intereses de cualquier partido político o que garanticen los
          derechos y garantías de partidos políticos de oposición, así como los
          datos relativos a la salud, a la vida sexual, y los datos biométricos.
        </p>

        <p className="font-semibold mb-2">Encargado del tratamiento:</p>
        <p className="mb-4">
          Persona natural o jurídica, pública o privada, que por sí misma o en
          asocio con otros, realice el tratamiento de datos personales por
          cuenta del responsable del tratamiento.
        </p>

        <p className="font-semibold mb-2">Responsable del tratamiento:</p>
        <p className="mb-4">
          Persona natural o jurídica, pública o privada, que por sí misma o en
          asocio con otros, decida sobre la base de datos y/o el tratamiento de
          los datos.
        </p>

        <p className="font-semibold mb-2">Titular:</p>
        <p className="mb-4">
          Persona natural cuyos datos personales sean objeto de tratamiento.
        </p>

        <p className="font-semibold mb-2">Tratamiento:</p>
        <p className="mb-4">
          Cualquier operación o conjunto de operaciones sobre datos personales,
          tales como la recolección, almacenamiento, uso, circulación o
          supresión.
        </p>

        <p className="font-semibold mb-2">Aviso de privacidad:</p>
        <p className="mb-4">
          Comunicación verbal o escrita generada por el responsable, dirigida al
          Titular para el tratamiento de sus datos personales, mediante la cual
          se le informa acerca de la existencia de las políticas de tratamiento
          de información que le serán aplicables, la forma de acceder a las
          mismas y las finalidades del tratamiento que se pretende dar a los
          datos personales.
        </p>

        <p className="font-semibold mb-2">Transferencia:</p>
        <p className="mb-4">
          La transferencia de datos tiene lugar cuando el responsable y/o
          encargado del tratamiento de datos personales, ubicado en Colombia,
          envía la información o los datos personales a un receptor, que a su
          vez es responsable del tratamiento y se encuentra dentro o fuera del
          país.
        </p>

        <p className="mb-4">
          No será necesaria la autorización del Titular cuando se trate de:
        </p>

        <ul className="list-disc list-inside mb-4">
          <li>
            Información requerida por una entidad pública o administrativa en
            ejercicio de sus funciones legales o por orden judicial.
          </li>
          <li>Datos de naturaleza pública.</li>
          <li>Casos de urgencia médica o sanitaria.</li>
          <li>
            Tratamiento de información autorizado por la ley para fines
            históricos, estadísticos o científicos.
          </li>
        </ul>

        <p>
          <strong>NEGO</strong>, en el desarrollo de su actividad empresarial,
          lleva a cabo el tratamiento de datos personales relativos a personas
          naturales que están contenidos y son tratados en bases de datos
          destinadas a finalidades legítimas, cumpliendo con la Constitución y
          la Ley.
        </p>
      </div>
    </div>
  );
};

export default AvisoLegal;
