async fetchData() {
    try {
      console.log("Fetching data...");
      const invoiceResponse = await fetch('http://localhost:3000/api/invoice/get', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const invoiceData = await invoiceResponse.json();
      console.log("Invoice Data:", invoiceData);
  
      const paymentResponse = await fetch('http://localhost:3000/api/payment');
      const paymentData = await paymentResponse.json();
      console.log("Payment Data:", paymentData);
  
      if (invoiceData.success && paymentData.success) {
        const occupiedRooms = invoiceData.data.map((invoice) => ({
          status: 'Lunas',
          tenantName: invoice.tenantName,
        }));
        const vacantRooms = Array.from(
          { length: 10 - occupiedRooms.length },
          () => ({ status: 'Kosong', tenantName: null })
        );
  
        this.rooms = [...occupiedRooms, ...vacantRooms];
        console.log("Final Room Data:", this.rooms);
        this.payments = paymentData.data;
      } else {
        console.error('Gagal mendapatkan data dari API');
      }
    } catch (error) {
      console.error('Kesalahan saat fetch data:', error.message);
    }
  }
  