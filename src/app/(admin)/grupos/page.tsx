"use client";

import React, { useState } from "react";
import DemoTable from "~/app/_components/admin/Table";
import { Button } from "~/app/_components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/app/_components/ui/card";
import { api } from "~/trpc/react";
import { Loader2 } from "lucide-react";
import { SearchTask } from "~/app/_components/admin/SearchTask";
import { Alert, AlertDescription } from "~/app/_components/ui/alert";

const TableDemo = () => {
  const [taskId, setTaskId] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [searchTaskId, setSearchTaskId] = useState<string | null>(null);

  // Query para buscar compañías por taskId
  const { data: searchResult, isLoading: isSearching } = api.companies.getExampleCompanies.useQuery(
    { taskId: searchTaskId || "" },
    { 
      enabled: searchTaskId !== null && searchTaskId !== "",
      refetchOnWindowFocus: false
    }
  );

  const mutation = api.companies.generateCompanies.useMutation({
    onSuccess: (data) => {
      if (data) {
        setTaskId(data.task_id);
        setStatus(data.message.es);
      }
    },
    onError: (error) => {
      setStatus("Error: " + error.message);
    },
  });

  const handleGenerateCompanies = async () => {
    try {
      await mutation.mutateAsync();
    } catch (error) {
      console.error("Error generating companies:", error);
    }
  };

  return (
    <div className="space-y-4 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Generar Grupos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            onClick={handleGenerateCompanies}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generando...
              </>
            ) : (
              "Generar Grupos"
            )}
          </Button>
          {(taskId || status) && (
            <div className="mt-4 space-y-2">
              {taskId && <p className="text-sm">Task ID: {taskId}</p>}
              {status && <p className="text-sm">Estado: {status}</p>}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Buscar por Task ID</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <SearchTask 
            onSearch={setSearchTaskId} 
            isLoading={isSearching}
          />
          {searchTaskId && (
            <Alert>
              <AlertDescription>
                Buscando Task ID: {searchTaskId}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <DemoTable data={searchResult?.groups || []} />
    </div>
  );
};

export default TableDemo;
