import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import ReactPDF from '@react-pdf/renderer';

class createPdf{
    constructor() {}
  
    async generatePDF(res) {
      const ctPdfRes = new CTPdfRes(res);
      const data = ctPdfRes.getLongTitle()
      const styles = StyleSheet.create({
        page: {
          flexDirection: 'row',
          backgroundColor: '#E4E4E4'
        },
        section: {
          margin: 10,
          padding: 10,
          flexGrow: 1
        }
      });
  
      
      const MyDocument = () => {
        return (
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.section}>
              <Text>data</Text>
            </View>
            <View style={styles.section}>
              <Text>Section #2</Text>
            </View>
          </Page>
        </Document>
      );
        }
      ReactPDF.render(<MyDocument />, `${__dirname}/example.pdf`);
  
      return data
    }
  }
  
  module.exports = createPdf;