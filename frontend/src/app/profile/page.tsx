'use client';

import { useState, useMemo, useEffect } from 'react';
import { TestResult } from '@/app/mocks/types/test';
import { TestService } from '@/app/mocks/services/test-service';

type SortField = 'dateTaken' | 'score' | 'testName';
type SortOrder = 'asc' | 'desc';
type TestType = 'ALL' | 'TOEIC' | 'IELTS' | 'TOEFL';

export default function ProfilePage() {
  const [sortField, setSortField] = useState<SortField>('dateTaken');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [filterType, setFilterType] = useState<TestType>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [testResults, setTestResults] = useState<TestResult[]>([]);

  const filteredAndSortedTests = useMemo(() => {
    let results = [...testResults];
    
    if (filterType !== 'ALL') {
      results = results.filter(test => test.testType === filterType);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      results = results.filter(test => 
        test.testName.toLowerCase().includes(query)
      );
    }

    results.sort((a, b) => {
      if (sortField === 'dateTaken') {
        return sortOrder === 'desc' 
          ? new Date(b.dateTaken).getTime() - new Date(a.dateTaken).getTime()
          : new Date(a.dateTaken).getTime() - new Date(b.dateTaken).getTime();
      }
      if (sortField === 'score') {
        return sortOrder === 'desc' ? b.score - a.score : a.score - b.score;
      }
      return sortOrder === 'desc' 
        ? b.testName.localeCompare(a.testName)
        : a.testName.localeCompare(b.testName);
    });

    return results;
  }, [testResults, filterType, searchQuery, sortField, sortOrder]);

  useEffect(() => {
    const fetchTestResults = async () => {
      try {
        const results = await TestService.getTestResults();
        setTestResults(results);
      } catch (error) {
        console.error('Error fetching test results:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestResults();
  }, []);

  // ... your existing filtering and sorting logic ...

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", background: "#fff", padding: 32, borderRadius: 12, boxShadow: "0 2px 8px #0001" }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>My Test History</h1>
      
      {/* Search and Filters */}
      <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
        <input
          type="text"
          placeholder="Search tests..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            flex: 1,
            minWidth: 200,
            padding: "8px 12px",
            borderRadius: 8,
            border: "1px solid #e5e7eb"
          }}
        />
        
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as TestType)}
          style={{
            padding: "8px 12px",
            borderRadius: 8,
            border: "1px solid #e5e7eb",
            background: "white"
          }}
        >
          <option value="ALL">All Types</option>
          <option value="TOEIC">TOEIC</option>
          <option value="IELTS">IELTS</option>
          <option value="TOEFL">TOEFL</option>
        </select>

        <div style={{ display: "flex", gap: 8 }}>
          <select
            value={sortField}
            onChange={(e) => setSortField(e.target.value as SortField)}
            style={{
              padding: "8px 12px",
              borderRadius: 8,
              border: "1px solid #e5e7eb",
              background: "white"
            }}
          >
            <option value="dateTaken">Date</option>
            <option value="score">Score</option>
            <option value="testName">Test Name</option>
          </select>

          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            style={{
              padding: "8px 12px",
              borderRadius: 8,
              border: "1px solid #e5e7eb",
              background: "white",
              cursor: "pointer"
            }}
          >
            {sortOrder === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      </div>

      {/* Test Results Table */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f3f4f6" }}>
              <th style={{ padding: 12, textAlign: "left", fontWeight: 600 }}>Test Name</th>
              <th style={{ padding: 12, textAlign: "left", fontWeight: 600 }}>Type</th>
              <th style={{ padding: 12, textAlign: "left", fontWeight: 600 }}>Score</th>
              <th style={{ padding: 12, textAlign: "left", fontWeight: 600 }}>Date Taken</th>
              <th style={{ padding: 12, textAlign: "left", fontWeight: 600 }}>Performance</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedTests.map((test) => (
              <tr 
                key={test.id} 
                style={{ 
                  borderBottom: "1px solid #e5e7eb",
                  transition: "background-color 0.2s",
                  ":hover": { backgroundColor: "#f9fafb" }
                }}
              >
                <td style={{ padding: 12 }}>{test.testName}</td>
                <td style={{ padding: 12 }}>{test.testType}</td>
                <td style={{ padding: 12 }}>{test.score}</td>
                <td style={{ padding: 12 }}>
                  {new Date(test.dateTaken).toLocaleDateString()}
                </td>
                <td style={{ padding: 12 }}>
                  {test.correctAnswers}/{test.totalQuestions}
                  {" "}
                  <span style={{ color: "#6b7280" }}>
                    ({((test.correctAnswers / test.totalQuestions) * 100).toFixed(1)}%)
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredAndSortedTests.length === 0 && (
          <div style={{ 
            textAlign: "center", 
            padding: "32px 0", 
            color: "#6b7280",
            fontSize: 16 
          }}>
            No test results found
          </div>
        )}
      </div>
    </div>
  );
}