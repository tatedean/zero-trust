import React, { FC, useState } from 'react';
import styles from './RouteLinks.module.scss';
import { Routes, Route, Navigate } from 'react-router-dom';
import ZeroTrust from '../ZeroTrust/ZeroTrust';

export default function RouteLinks(props:any){

  return(
  <Routes>
    <Route path="/" element={<Navigate to='/zero-trust'></Navigate>} />
    <Route path="/zero-trust" element={<ZeroTrust />} />
  </Routes>
  );
};

