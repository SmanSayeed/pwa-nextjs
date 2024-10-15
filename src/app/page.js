'use client'
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'


export default function Home() {


  return (
    <main className="flex min-h-screen flex-col items-center gap-10 py-20 px-4">
      <motion.h1
        className="text-4xl font-bold text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >Welcome CliniqueX!</motion.h1>
   
    
    </main>
  )
}