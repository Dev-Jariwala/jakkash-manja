// ExportPDF.js
import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
const styles = StyleSheet.create({
  billContainer: {
    width: "90%",
    margin: "auto",
    height: "100%",
    // backgroundColor: "yellow",
    display: "flex",
    flexDirection: "column",
    // alignItems: "center",
    justifyContent: "space-between",
    padding: "30px 0 10px",
  },
  billHead: {
    display: "flex",
    flexDirection: "row",
    alignItems: "start",
    justifyContent: "space-between",
    // backgroundColor: "red",
  },
  brand: {
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
    justifyContent: "center",
  },
  brandName: {
    fontWeight: "900",
    fontSize: 20,
  },
  brandSlogan: {
    fontSize: 10,
    color: "grey",
  },
  billTop: {
    // backgroundColor: "yellowgreen",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 9,
    margin: "20px 0",
  },
  billTopRight: {
    width: "35%",
  },
  billDetails: {
    display: "flex",
    flexDirection: "row",
    alignItems: "space-between",
    justifyContent: "space-between",
    marginBottom: "5px",
  },
  fontBold: {
    fontSize: 11,
    fontWeight: "bold",
  },
  fontLight: {
    fontSize: 9,
    fontWeight: "light",
  },
  marbot10: {
    marginBottom: "5px",
  },
  table: {
    display: "flex",
    flexDirection: "column",
  },
  tHead: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 10,
    borderTop: "1px solid black",
    borderBottom: "1px solid black",
    padding: "7px 0",
  },
  tBody: {
    display: "flex",
    flexDirection: "column",
  },
  tR: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 9,
    borderBottom: "1px solid #ccc",
    padding: "10px 0",
  },
  tH: {
    width: "17%",
    textAlign: "center",
  },
  tD: {
    width: "17%",
    textAlign: "center",
  },
});

const ExportPDF = ({ exportData, headers, title }) => {
  return (
    <>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.billContainer}>
            <View>
              <Text
                style={{
                  textAlign: "center",
                  marginBottom: "20px",
                  fontWeight: "bold",
                  fontSize: "22px",
                }}
              >
                {title}
              </Text>
              <View style={styles.table}>
                {/* Table Header */}
                <View style={styles.tHead}>
                  {headers?.map((head) => (
                    <Text key={head.key} style={styles.tH}>
                      {head.label}
                    </Text>
                  ))}
                </View>

                <View style={styles.tBody}>
                  {/* Table Rows */}
                  {exportData.map((data) => (
                    <View style={styles.tR} key={data._id}>
                      {headers?.map((head) => (
                        <Text key={`${data._id}-${head.key}`} style={styles.tD}>
                          {data[head.key]}
                        </Text>
                      ))}
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    </>
  );
};

export default ExportPDF;
