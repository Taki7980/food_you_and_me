"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Barcode, Search } from "lucide-react";
import { useBarCodeStore } from "@/store/BarCodeStore";

export default function BarcodeSearch() {
  const [isFocused, setIsFocused] = useState(false);
  const [barcode, setBarcode] = useState("");
  const { fetchBarcodeItems } = useBarCodeStore();

  const handleBarcodeSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsFocused(true);
    try {
      await fetchBarcodeItems(barcode);
    } catch (error) {
      console.error("Error fetching barcode item:", error);
    } finally {
      setIsFocused(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
        className="flex justify-center mb-6"
      >
        <Barcode className="h-12 w-12 text-primary" />
      </motion.div>
      <form onSubmit={handleBarcodeSearch} className="space-y-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="Enter barcode..."
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            className="pl-10 pr-4 py-2 w-full bg-gray-50 border-2 border-primary/20 focus:border-primary transition-colors duration-300"
          />
          <Barcode className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary/50" />
        </div>
        <Button
          type="submit"
          disabled={isFocused}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300"
        >
          {isFocused ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <Search className="h-5 w-5" />
            </motion.div>
          ) : (
            <>
              <Search className="mr-2 h-5 w-5" /> Search by Barcode
            </>
          )}
        </Button>
      </form>
    </motion.div>
  );
}
