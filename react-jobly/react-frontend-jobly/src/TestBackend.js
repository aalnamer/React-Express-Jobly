import React, { useEffect, useState } from "react";
import axios from "axios";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY4MDkwMTQxNH0.QyE-L-tjDdfVSpYOhy9H-UEJp7m1fi4FOvGI72jpjRo";

function TestSite() {
  const [data, setData] = useState({});
  useEffect(() => {
    async function getData() {
      const result = await axios.get("http://localhost:3001/users/testuser", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(result);
    }
    getData();
  }, []);

  return;
}

export default TestSite;
