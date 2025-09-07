"use client";

import { motion, AnimatePresence } from "framer-motion";
import { IModal } from "../interfaces/IModal";


export default function Modal({isOpen, setIsOpen, title, content}: IModal) {

  return (
    <>
      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="flex items-center justify-center max-h-screen">
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-gray-200 bg-opacity-80 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* modal box */}
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50 "
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white p-6 rounded-2xl shadow-lg w-2/3 text-left">
                
                {/* Title */}
                <h2 className="text-xl font-bold mb-4">{title}</h2>

                {/* Content */}
                <div className="text-gray-600 mb-6">
                  {content}
                </div>
                
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
