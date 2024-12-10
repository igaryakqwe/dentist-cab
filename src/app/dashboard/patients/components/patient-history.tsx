import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PatientEvent } from '@/types/patient';
import { FC } from 'react';
import { CalendarCheck } from 'lucide-react';

interface PatientHistoryProps {
  patientEvents: PatientEvent[];
}

const PatientHistory: FC<PatientHistoryProps> = ({ patientEvents }) => {
  return (
    <Card className="max-h-[85vh] overflow-y-auto">
      <CardHeader>
        <CardTitle>Історія візитів</CardTitle>
        <CardDescription>Хронологія стоматологічних прийомів</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="absolute left-3 top-1 h-[90%] w-0.5 bg-gray-200"></div>
          {patientEvents.map((record, index) => (
            <div key={index} className="mb-8 flex items-start">
              <div className="flex flex-col items-center mr-4">
                <div className="z-20 rounded-full h-6 w-6 flex items-center outline-4 outline-white justify-center bg-blue-100 text-blue-800">
                  <CalendarCheck className="h-2.5 w-2.5 text-primary" />
                </div>
                {index !== patientEvents.length - 1 && (
                  <div className="h-full w-0.5 bg-gray-200"></div>
                )}
              </div>
              <Card className="flex-grow">
                <CardHeader className="p-4">
                  <div className="flex items-center justify-between">
                    <Badge>{record.service.duration} хв</Badge>
                    <span className="text-sm text-muted-foreground">
                      {record.startDate.toDateString()}
                    </span>
                  </div>
                  <CardTitle className="text-base">
                    {record.service.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm text-muted-foreground">
                    Лікар: {record.doctor.name} {record.doctor.surname}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientHistory;
