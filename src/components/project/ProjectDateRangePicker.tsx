import React, { useState, useEffect, useRef } from "react";

interface ProjectDateRangePickerProps {
  startDateTime: string; // ISO string, e.g. "2025-07-21T10:00"
  endDateTime: string;   // ISO string
  onChange: (start: string, end: string, isValid: boolean) => void;
}

const MIN_DURATION_HOURS = 4;

const ProjectDateRangePicker: React.FC<ProjectDateRangePickerProps> = ({
  startDateTime,
  endDateTime,
  onChange,
}) => {
  const [start, setStart] = useState(startDateTime);
  const [end, setEnd] = useState(endDateTime);
  const [errors, setErrors] = useState<string[]>([]);

  // Keep last values sent to parent to avoid infinite loops
  const lastSent = useRef<{start: string; end: string; valid: boolean} | null>(null);

  useEffect(() => {
    const errs: string[] = [];
    const now = new Date();
    const startDate = new Date(start);
    const endDate = new Date(end);

    if (startDate < now) {
      errs.push("Start date/time cannot be in the past.");
    }

    if (endDate <= startDate) {
      errs.push("End date/time must be after start date/time.");
    }

    const diffHours = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
    if (diffHours < MIN_DURATION_HOURS) {
      errs.push(`Minimum duration is ${MIN_DURATION_HOURS} hours.`);
    }

    setErrors(errs);

    const isValid = errs.length === 0;

    // Only call onChange if values changed to prevent infinite loops
    if (
      !lastSent.current ||
      lastSent.current.start !== start ||
      lastSent.current.end !== end ||
      lastSent.current.valid !== isValid
    ) {
      onChange(start, end, isValid);
      lastSent.current = { start, end, valid: isValid };
    }
  }, [start, end, onChange]);

  // Helper for min attr: current datetime in local ISO string format truncated
  const getNowLocalISO = () => {
    const now = new Date();
    const tzOffsetMs = now.getTimezoneOffset() * 60 * 1000;
    const localISO = new Date(now.getTime() - tzOffsetMs).toISOString().slice(0, 16);
    return localISO;
  };

  return (
    <div className="space-y-2">
      <label className="block font-medium">Start Date & Time</label>
      <input
        type="datetime-local"
        value={start}
        min={getNowLocalISO()}
        onChange={(e) => setStart(e.target.value)}
        className="border rounded p-2 w-full"
      />

      <label className="block font-medium mt-4">End Date & Time</label>
      <input
        type="datetime-local"
        value={end}
        min={start}
        onChange={(e) => setEnd(e.target.value)}
        className="border rounded p-2 w-full"
      />

      {errors.length > 0 && (
        <ul className="text-red-600 mt-2 list-disc list-inside">
          {errors.map((err, i) => (
            <li key={i}>{err}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProjectDateRangePicker;