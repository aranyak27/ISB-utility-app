import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Settings, Users, QrCode, FileText, Activity, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminHome = () => {
  const navigate = useNavigate();
  
  const stats = [
    { label: "Active Sessions", value: "23", icon: Activity, color: "text-primary" },
    { label: "Total Facilities", value: "8", icon: Settings, color: "text-success" },
    { label: "Peak Occupancy Today", value: "85%", icon: BarChart3, color: "text-warning" },
    { label: "Total Check-ins Today", value: "147", icon: Users, color: "text-primary" }
  ];

  const recentActivity = [
    { time: "2 mins ago", event: "User checked into Recreation Center A", type: "checkin" },
    { time: "5 mins ago", event: "Gym & Fitness reached full capacity", type: "capacity" },
    { time: "12 mins ago", event: "User checked out of Study Hall", type: "checkout" },
    { time: "18 mins ago", event: "Admin updated facility hours", type: "admin" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage facilities and monitor usage</p>
          </div>
          <Button className="mt-4 sm:mt-0">
            <QrCode className="mr-2 h-4 w-4" />
            Generate QR Code
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-gradient-to-br from-card to-secondary/30 border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Quick Actions */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-foreground">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Settings className="mr-2 h-4 w-4" />
                Manage Facilities
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BarChart3 className="mr-2 h-4 w-4" />
                Live Dashboard
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Export Reports
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <QrCode className="mr-2 h-4 w-4" />
                QR Manager
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-foreground">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm text-foreground">{activity.event}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {activity.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Status */}
        <Card className="mt-6 bg-gradient-to-r from-success/5 to-success/10 border-success/20">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Activity className="h-5 w-5 text-success" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground">All systems operational</p>
                <p className="text-xs text-muted-foreground">Last updated: Just now</p>
              </div>
              <Badge className="bg-success text-success-foreground">
                Online
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminHome;