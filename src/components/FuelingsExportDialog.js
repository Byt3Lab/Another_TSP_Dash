import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { FuelingPdf } from "./FuelingPdf";
import { useState } from "react";
import AfricLogo from "../assets/companies/logo_afric.png";
import PumaLogo from "../assets/companies/logo_pumaEnergy.png";
import SnpcLogo from "../assets/companies/logo_snpc.png";
import TotalLogo from "../assets/companies/logo_totalEnergies.png";
import XOilLogo from "../assets/companies/logo_xOil.png";
import TSPLogo from "../assets/companies/logo_tsp.png";

const handleExportFueling = async (fueling) => {
  return (
    <div style={{ flexGrow: 1 }}>
      <PDFViewer
        showToolbar={false}
        style={{
          width: "100%",
          height: "95%",
        }}
      >
        <FuelingPdf fueling={fueling} />
      </PDFViewer>
      <PDFDownloadLink
        document={<FuelingPdf fueling={fueling} />}
        fileName="somename.pdf"
      >
        {({ loading }) => (loading ? "Loading document..." : "Download now!")}
      </PDFDownloadLink>
    </div>
  );
};

const FuelingExportDialog = ({ onClose, open, processing, fueling }) => {
  const [provider, setProvider] = useState(
    fueling?.fuelProvider === "TOTAL ENERGIES"
      ? TotalLogo
      : fueling?.fuelProvider === "AFRIC"
      ? AfricLogo
      : fueling?.fuelProvider === "X-OIL"
      ? XOilLogo
      : fueling?.fuelProvider === "PUMA ENERGY"
      ? PumaLogo
      : fueling?.fuelProvider === "SNAT"
      ? TSPLogo
      : fueling?.fuelProvider === "SNPC-D"
      ? SnpcLogo
      : TSPLogo
  );
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="fueling-export-dialog-title"
      fullWidth={true}
      maxWidth={"sm"}
    >
      <DialogTitle id="fueling-dialog-title">
        {"Exporter l'abonnement"}
      </DialogTitle>
      <DialogContent sx={{ height: "500px" }}>
        <PDFViewer showToolbar={false} width={"100%"} height={"100%"}>
          <FuelingPdf fueling={fueling} provider={provider} />
        </PDFViewer>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{"Annuler"}</Button>
        <PDFDownloadLink
          document={<FuelingPdf fueling={fueling} provider={provider} />}
          fileName={`${fueling?.name}_${fueling?.forename}_${new Date(
            fueling?.created_at.seconds * 1000 +
              fueling?.created_at.nanoseconds / 1000000
          )
            .toLocaleDateString("fr-CG")
            .toString()}.pdf`}
        >
          <LoadingButton loading={processing} type="submit" variant="contained">
            {"Exporter"}
          </LoadingButton>
        </PDFDownloadLink>
      </DialogActions>
    </Dialog>
  );
};

export default FuelingExportDialog;
