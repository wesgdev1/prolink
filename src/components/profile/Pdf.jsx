import {
  Document,
  Page,
  Image,
  Text,
  StyleSheet,
  View,
  Line,
} from "@react-pdf/renderer";

export const Pdf = ({ data }) => {
  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
      backgroundColor: "#E4E4E4",
      padding: 30,
    },
    section: {
      margin: 10,
      padding: 10,
      backgroundColor: "#CACACA",
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginTop: 2,
    },
    text: {
      fontSize: 20,
      textAlign: "center",
      marginTop: 20,
    },
    signatureSection: {
      marginTop: 50,
      marginLeft: 10,
    },
    line: {
      marginVertical: 10,
      borderBottomColor: "black",
      borderBottomWidth: 1,
    },
    solutionSection: {
      marginTop: 10,
      marginLeft: 10,
    },
    solutionText: {
      marginBottom: 5,
    },
    emptySolution: {
      border: "1px solid black",
      height: 100, // Adjust the height according to your needs
    },
  });
  return (
    <Document>
      {data && data.length > 0 ? (
        data?.map((soporte) => (
          <Page key={soporte.id} style={styles.page}>
            <Image
              src="https://res.cloudinary.com/dppqkypts/image/upload/v1702156223/Dise%C3%B1o_sin_t%C3%ADtulo_17_cz79tt.png"
              style={styles.image}
            />
            <Line style={styles.line} />
            <Text style={styles.text}>
              Orden de Servicio: {soporte.numeroSoporte}
            </Text>
            <View style={styles.section}>
              <Text>Numero de soporte: {soporte.numeroSoporte}</Text>
              <Text>Nombre: {soporte.cliente.nombreCompleto}</Text>
              <Text>Telefono: {soporte.cliente.telefono}</Text>
              <Text>Direccion: {soporte.cliente.direccion}</Text>
              <Text>Fecha: {soporte.fechaGeneracion}</Text>
              <Text>Hora: {soporte.horaGeneracion}</Text>
            </View>
            <Line style={styles.line} />

            <View style={styles.section}>
              <Text>Falla: {soporte.descripcion}</Text>
            </View>

            <Line style={styles.line} />
            <View style={styles.solutionSection}>
              <Text style={styles.solutionText}>Solución:</Text>
              <Text style={styles.emptySolution}></Text>
            </View>
            <View style={styles.signatureSection}>
              <Text>Firma del Cliente: _________________________</Text>
            </View>
            <View style={styles.signatureSection}>
              <Text>Firma del Tecnico: _________________________</Text>
            </View>
          </Page>
        ))
      ) : (
        <Page style={styles.page}>
          <Text>No hay Soportes pendientes</Text>
        </Page>
      )}
    </Document>
  );
};
