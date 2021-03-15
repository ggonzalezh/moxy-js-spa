import React, { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router";
import { GetCollectionsUseCase } from "../../../domain/GetCollectionsUseCase";

export const PathList = () => {
  const { mockName }: { mockName: string } = useParams();

  useEffect(() => {}, [mockName]); //Call getCollectionByName if param change
  return (
    <div>
      <h1>{mockName} Data</h1>
    </div>
  );
};
