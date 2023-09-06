'use client'

import * as React from 'react'
import { PropsWithChildren } from "react";
import { ClientProviderList } from './ClientProviderList';
import { Nunito_Sans } from 'next/font/google';

const font = Nunito_Sans({
  weight: '400',
  subsets: ['latin'],
  display: 'swap'
})


export default function Layout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={font.className} suppressHydrationWarning={true}>
        <ClientProviderList>
          {children}
        </ClientProviderList>
      </body>
    </html>
  );
}