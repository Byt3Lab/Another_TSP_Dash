import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import TSPLogo from "../assets/companies/logo_tsp.png";

Font.register({
  family: "Poppins",
  fonts: [
    {
      src: "http://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrFJDUc1NECPY.ttf",
      fontWeight: 400,
    },
    {
      src: "http://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLCz7V1tvFP-KUEg.ttf",
      fontWeight: 700,
    },
  ],
});
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
    paddingHorizontal: 20,
    fontFamily: "Poppins",
  },
  heading: {
    fontSize: 26,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "3%",
    flexGrow: 0.1,
    marginTop: "5%",
  },
  headingImage: {
    width: 75,
    height: 75,
  },
  section1: {
    padding: 10,
    flexGrow: 0.05,
  },
  section2: {
    padding: 10,
    fontSize: 14,
  },
  titleText: {
    fontSize: 22,
  },
  dataRow: {
    fontSize: 26,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    flexGrow: 1,
  },
  dataText: {
    fontSize: 16,
    marginTop: 2,
  },
  dataImage: {
    width: 90,
    height: 90,
  },
});

const FuelingPdf = ({ fueling, provider }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.heading}>
        <Image src={TSPLogo} style={styles.headingImage} />
        <Text>Abonnement carburant</Text>
      </View>
      <View style={styles.section1}>
        <Text style={styles.titleText}>Fournisseur</Text>
        <View style={styles.dataRow} wrap={false}>
          <Text style={styles.dataText}>{fueling.fuelProvider}</Text>
          <Image src={provider} style={styles.dataImage} />
        </View>
      </View>
      <View style={styles.section2}>
        <Text style={styles.titleText}>Client</Text>
        <Text style={styles.dataText}>Nom</Text>
        <Text>{fueling.name + " " + fueling.forename}</Text>
        <Text style={styles.dataText}>Telephone</Text>
        <Text>{fueling.phone}</Text>
        <Text style={styles.dataText}>Numéro de CNI</Text>
        <Text>{fueling.cni}</Text>
        <Text style={styles.dataText}>Adresse</Text>
        <Text>{fueling.address}</Text>
        <Text style={styles.dataText}>Type de compte</Text>
        <Text>{fueling.accountType}</Text>
        <Text style={styles.dataText}>Type de carburant</Text>
        <Text>{fueling.fuelType}</Text>
        <Text style={styles.dataText}>Quantité à consommer</Text>
        <Text>{fueling.quantity}L</Text>
        <Text style={styles.dataText}>Durée de l'abonnement</Text>
        <Text>
          {fueling.subDuration.toString().split("")[1] === "M"
            ? `${fueling.subDuration.toString().split("")[0]} Mois`
            : `${fueling.subDuration.toString().split("")[0]} An(s)`}
        </Text>
        <Text style={styles.dataText}>Date d'abonnement</Text>
        <Text>
          {new Date(
            fueling.created_at.seconds * 1000 +
              fueling.created_at.nanoseconds / 1000000
          )
            .toLocaleDateString("fr-CG")
            .toString()}
        </Text>
      </View>
    </Page>
  </Document>
);

export { FuelingPdf };
