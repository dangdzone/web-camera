'use client'

import * as React from 'react'
import { PropsWithChildren } from "react";
import { ClientProviderList } from './ClientProviderList';
import { Nunito_Sans } from 'next/font/google';

const font = Nunito_Sans({
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap'
})


export default function Layout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <title>Camera - Thương mại điện tử</title>
        <meta name='description' content='Camera - Thương mại điện tử' />
        <link rel="icon" href="https://cdn-icons-png.flaticon.com/512/7779/7779866.png" />
      </head>
      <body className={font.className} suppressHydrationWarning>
        <ClientProviderList>
          {children}
        </ClientProviderList>
      </body>
    </html>
  );
}