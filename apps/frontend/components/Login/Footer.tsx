import { Link } from "@mui/material";

export default function () {
  return (
    <footer className="text-center py-4 mt-4">
      <p className="text-gray-600">
        purpose of this project: Ebuddy Technical Test before Interview.
      </p>
      <p className="text-gray-600">
        for documentation, visit <Link href="/docs">/docs</Link>
      </p>
    </footer>
  );
}
