import { useState, useEffect } from 'react';
import { supabase } from '../services/authService';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { KeywordBadge } from './KeywordBadge';

const KeywordHistory = () => {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data, error } = await supabase
          .from('keywords')
          .select('keywords, created_at')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching history:', error);
        } else {
          setHistory(data);
        }
      }
      setLoading(false);
    };

    fetchHistory();
  }, []);

  if (loading) {
    return <div>Loading history...</div>;
  }

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Your Keyword Analysis History</CardTitle>
        </CardHeader>
        <CardContent>
          {history.length === 0 ? (
            <p>No history found.</p>
          ) : (
            <div className="space-y-4">
              {history.map((item, index) => (
                <div key={index} className="p-4 border rounded-md">
                  <p className="text-sm text-muted-foreground">
                    {new Date(item.created_at).toLocaleString()}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {item.keywords.map((keyword: string, i: number) => (
                      <KeywordBadge
                        key={i}
                        keyword={{ keyword: keyword, density: 0 }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default KeywordHistory;
