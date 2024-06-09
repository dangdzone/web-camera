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
        <title>FlyGo - Thương mại điện tử</title>
        <meta name='description' content='Camera - Thương mại điện tử' />
        <link rel="icon" href="https://www.flygo-aviation.com/wp-content/uploads/2021/08/flygo-logo-trp-big.png" />
      </head>
      <body className={font.className} suppressHydrationWarning>
        <ClientProviderList>
          {children}
        </ClientProviderList>
      </body>
    </html>
  );
}