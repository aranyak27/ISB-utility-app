import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Calendar, Clock, MapPin, Users, Trophy, Target, Zap, Crown, Medal, Star, TrendingUp, Award } from "lucide-react";

const ViewMySessions = () => {
  const navigate = useNavigate();
  
  const [sessions] = useState([
    {
      id: 1,
      facility: "Recreation Center A",
      sport: "Badminton",
      date: "2024-09-25",
      time: "14:00 - 15:30",
      startTime: "14:00",
      autoLogoutTime: "15:30",
      duration: "1h 30m",
      status: "Auto Closed",
      location: "Block A, Ground Floor"
    },
    {
      id: 2,
      facility: "Gym & Fitness",
      sport: "Gym",
      date: "2024-09-25",
      time: "09:00 - 10:30",
      startTime: "09:00",
      autoLogoutTime: "10:30",
      duration: "1h 30m",
      status: "Auto Closed",
      location: "Block B, First Floor"
    },
    {
      id: 3,
      facility: "LRC",
      sport: "Study",
      date: "2024-09-25",
      time: "11:00 - 14:00",
      startTime: "11:00",
      autoLogoutTime: "14:00",
      duration: "3h",
      status: "In Progress",
      location: "Block C, Second Floor"
    },
    {
      id: 4,
      facility: "Recreation Center B",
      sport: "Table Tennis",
      date: "2024-09-24",
      time: "16:00 - 17:00",
      startTime: "16:00",
      autoLogoutTime: "17:30",
      duration: "1h",
      status: "Completed",
      location: "Block A, First Floor"
    },
    {
      id: 5,
      facility: "Gym & Fitness",
      sport: "Gym",
      date: "2024-09-23",
      time: "08:00 - 09:30",
      startTime: "08:00",
      autoLogoutTime: "09:30",
      duration: "1h 30m",
      status: "Auto Closed",
      location: "Block B, First Floor"
    },
    {
      id: 6,
      facility: "LRC",
      sport: "Study",
      date: "2024-09-22",
      time: "10:00 - 12:15",
      startTime: "10:00",
      autoLogoutTime: "13:00",
      duration: "2h 15m",
      status: "Completed",
      location: "Block C, Second Floor"
    }
  ]);

  // Gamification data
  const [userStats] = useState({
    currentRank: 15,
    totalUsers: 247,
    weeklyRank: 8,
    monthlyRank: 12,
    totalPoints: 1250,
    weeklyPoints: 340,
    level: 7,
    nextLevelPoints: 1500
  });

  const [facilityStats] = useState([
    {
      facility: "Recreation Center A",
      thisWeek: 3,
      thisMonth: 12,
      avgUsers: 8.5,
      yourRank: 5,
      totalUsers: 45,
      color: "bg-blue-500"
    },
    {
      facility: "Gym & Fitness",
      thisWeek: 2,
      thisMonth: 8,
      avgUsers: 6.2,
      yourRank: 12,
      totalUsers: 38,
      color: "bg-green-500"
    },
    {
      facility: "LRC",
      thisWeek: 1,
      thisMonth: 6,
      avgUsers: 4.1,
      yourRank: 8,
      totalUsers: 52,
      color: "bg-purple-500"
    }
  ]);

  const [achievements] = useState([
    {
      id: 1,
      title: "Fitness Enthusiast",
      description: "Used gym 5+ times this month",
      icon: Trophy,
      earned: true,
      progress: 100,
      rarity: "Gold"
    },
    {
      id: 2,
      title: "Well Rounded",
      description: "Used 3 different facilities this week",
      icon: Target,
      earned: true,
      progress: 100,
      rarity: "Silver"
    },
    {
      id: 3,
      title: "Early Bird",
      description: "Check-in before 7 AM (0/5)",
      icon: Zap,
      earned: false,
      progress: 0,
      rarity: "Bronze"
    },
    {
      id: 4,
      title: "Facility Explorer",
      description: "Visit all available facilities (3/5)",
      icon: Crown,
      earned: false,
      progress: 60,
      rarity: "Platinum"
    }
  ]);

  const [leaderboard] = useState([
    { rank: 1, name: "Alex Chen", points: 2150 },
    { rank: 2, name: "Sarah Kim", points: 1890 },
    { rank: 3, name: "Mike Jones", points: 1750 },
    { rank: 4, name: "Lisa Wang", points: 1620 },
    { rank: 5, name: "David Park", points: 1580 },
    { rank: 15, name: "You", points: 1250, isCurrentUser: true }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress': return 'bg-primary text-primary-foreground';
      case 'Completed': return 'bg-success text-success-foreground';
      case 'Auto Closed': return 'bg-orange-500 text-white';
      case 'Cancelled': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getAchievementColor = (rarity: string) => {
    switch (rarity) {
      case 'Platinum': return 'from-slate-400 to-slate-600';
      case 'Gold': return 'from-yellow-400 to-yellow-600';
      case 'Silver': return 'from-gray-300 to-gray-500';
      case 'Bronze': return 'from-amber-600 to-amber-800';
      default: return 'from-muted to-muted';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
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
        
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-foreground">My Sessions</h1>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              <Trophy className="h-3 w-3 mr-1" />
              Level {userStats.level}
            </Badge>
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
              <Crown className="h-3 w-3 mr-1" />
              Rank #{userStats.currentRank}
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6 mt-6">
            {/* Level Progress */}
            <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-foreground flex items-center gap-2">
                    <Star className="h-5 w-5 text-primary" />
                    Level Progress
                  </CardTitle>
                  <span className="text-sm text-muted-foreground">
                    {userStats.totalPoints}/{userStats.nextLevelPoints} XP
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <Progress 
                  value={(userStats.totalPoints / userStats.nextLevelPoints) * 100} 
                  className="h-3 mb-2"
                />
                <p className="text-sm text-muted-foreground">
                  {userStats.nextLevelPoints - userStats.totalPoints} XP to Level {userStats.level + 1}
                </p>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card className="bg-gradient-to-br from-card to-secondary/30 border-border">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Facilities Used</p>
                      <p className="text-2xl font-bold text-foreground">{sessions.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-card to-secondary/30 border-border">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Total Hours</p>
                      <p className="text-2xl font-bold text-foreground">7.5h</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-card to-secondary/30 border-border">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">This Month</p>
                      <p className="text-2xl font-bold text-foreground">12</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-card to-secondary/30 border-border">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Weekly Rank</p>
                      <p className="text-2xl font-bold text-foreground">#{userStats.weeklyRank}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-6 mt-6">
            {/* Facility Usage Analytics */}
            <Card className="bg-gradient-to-br from-card to-secondary/30 border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Facility Usage Analytics
                </CardTitle>
                <p className="text-muted-foreground">Compare your usage with other users</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {facilityStats.map((facility, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-foreground">{facility.facility}</h4>
                        <Badge variant="outline">
                          Rank #{facility.yourRank} of {facility.totalUsers}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">This Week</p>
                          <p className="text-lg font-bold text-foreground">
                            {facility.thisWeek} visits
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Avg: {facility.avgUsers} visits
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">This Month</p>
                          <p className="text-lg font-bold text-foreground">
                            {facility.thisMonth} visits
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Your Performance</span>
                          <span>{Math.round((facility.thisWeek / facility.avgUsers) * 100)}% of average</span>
                        </div>
                        <Progress 
                          value={(facility.thisWeek / facility.avgUsers) * 100} 
                          className="h-2"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="achievements" className="space-y-6 mt-6">
            {/* Achievements */}
            <Card className="bg-gradient-to-br from-card to-secondary/30 border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Achievements
                </CardTitle>
                <p className="text-muted-foreground">
                  {achievements.filter(a => a.earned).length} of {achievements.length} unlocked
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {achievements.map((achievement) => {
                    const Icon = achievement.icon;
                    return (
                      <Card 
                        key={achievement.id} 
                        className={`relative overflow-hidden ${
                          achievement.earned 
                            ? `bg-gradient-to-r ${getAchievementColor(achievement.rarity)}` 
                            : 'bg-muted/50'
                        }`}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-lg ${
                              achievement.earned ? 'bg-white/20' : 'bg-muted'
                            }`}>
                              <Icon className={`h-5 w-5 ${
                                achievement.earned ? 'text-white' : 'text-muted-foreground'
                              }`} />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className={`font-semibold ${
                                  achievement.earned ? 'text-white' : 'text-foreground'
                                }`}>
                                  {achievement.title}
                                </h4>
                                <Badge 
                                  variant="secondary" 
                                  className="text-xs"
                                >
                                  {achievement.rarity}
                                </Badge>
                              </div>
                              <p className={`text-sm ${
                                achievement.earned ? 'text-white/80' : 'text-muted-foreground'
                              }`}>
                                {achievement.description}
                              </p>
                              {!achievement.earned && achievement.progress > 0 && (
                                <div className="mt-2">
                                  <Progress value={achievement.progress} className="h-1" />
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="leaderboard" className="space-y-6 mt-6">
            {/* Leaderboard */}
            <Card className="bg-gradient-to-br from-card to-secondary/30 border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Medal className="h-5 w-5 text-primary" />
                  Monthly Leaderboard
                </CardTitle>
                <p className="text-muted-foreground">See how you rank against other users</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {leaderboard.map((user) => (
                    <div 
                      key={user.rank} 
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        user.isCurrentUser 
                          ? 'bg-primary/10 border border-primary/20' 
                          : 'bg-muted/30'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          user.rank === 1 ? 'bg-yellow-400 text-yellow-900' :
                          user.rank === 2 ? 'bg-gray-300 text-gray-700' :
                          user.rank === 3 ? 'bg-amber-600 text-amber-100' :
                          'bg-muted text-muted-foreground'
                        }`}>
                          {user.rank <= 3 ? (
                            user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : '🥉'
                          ) : (
                            user.rank
                          )}
                        </div>
                        <div>
                          <p className={`font-medium ${
                            user.isCurrentUser ? 'text-primary' : 'text-foreground'
                          }`}>
                            {user.name}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-foreground">{user.points}</p>
                        <p className="text-xs text-muted-foreground">points</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Sessions by Status */}
        <div className="space-y-8 mt-8">
          {/* In Progress Sessions */}
          {sessions.filter(session => session.status === 'In Progress').length > 0 && (
            <Card className="bg-gradient-to-br from-card to-secondary/30 border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                  In Progress Sessions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sessions.filter(session => session.status === 'In Progress').map((session) => (
                    <Card key={session.id} className="bg-gradient-to-br from-background to-secondary/30 border-border border-primary/30">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold text-foreground">{session.facility}</h3>
                              <Badge className={getStatusColor(session.status)}>
                                {session.status}
                              </Badge>
                            </div>
                            
                            <p className="text-primary font-medium mb-2">{session.sport}</p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-muted-foreground mb-2">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {formatDate(session.date)}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {session.time}
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {session.location}
                              </div>
                            </div>
                            
                            {session.status === 'In Progress' && session.autoLogoutTime && (
                              <div className="text-xs text-amber-600 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded">
                                ⏰ Auto logout at {session.autoLogoutTime} ({session.facility === 'LRC' ? '3h from start' : '1.5h from start'})
                              </div>
                            )}
                          </div>
                          
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">Max Duration</p>
                            <p className="font-semibold text-foreground">1h 30m</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Auto Closed Sessions */}
          {sessions.filter(session => session.status === 'Auto Closed').length > 0 && (
            <Card className="bg-gradient-to-br from-card to-secondary/30 border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  Auto Closed Sessions
                </CardTitle>
                <p className="text-muted-foreground text-sm">Sessions automatically ended after time limit (1.5h for most facilities, 3h for LRC)</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sessions.filter(session => session.status === 'Auto Closed').map((session) => (
                    <Card key={session.id} className="bg-gradient-to-br from-background to-secondary/30 border-border border-orange-200">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold text-foreground">{session.facility}</h3>
                              <Badge className={getStatusColor(session.status)}>
                                {session.status}
                              </Badge>
                            </div>
                            
                            <p className="text-primary font-medium mb-2">{session.sport}</p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-muted-foreground mb-2">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {formatDate(session.date)}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                Started: {session.startTime}
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {session.location}
                              </div>
                            </div>
                            
                            <div className="text-xs text-orange-600 bg-orange-50 dark:bg-orange-900/20 px-2 py-1 rounded">
                              🔒 Auto closed at {session.autoLogoutTime} ({session.facility === 'LRC' ? '3h limit' : '1.5h limit'} reached)
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">Duration</p>
                            <p className="font-semibold text-foreground">{session.duration}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Completed Sessions */}
          {sessions.filter(session => session.status === 'Completed').length > 0 && (
            <Card className="bg-gradient-to-br from-card to-secondary/30 border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <div className="w-3 h-3 bg-success rounded-full"></div>
                  Completed Sessions
                </CardTitle>
                <p className="text-muted-foreground text-sm">Sessions manually ended before time limit (1.5h for most facilities, 3h for LRC)</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sessions.filter(session => session.status === 'Completed').map((session) => (
                    <Card key={session.id} className="bg-gradient-to-br from-background to-secondary/30 border-border">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold text-foreground">{session.facility}</h3>
                              <Badge className={getStatusColor(session.status)}>
                                {session.status}
                              </Badge>
                            </div>
                            
                            <p className="text-primary font-medium mb-2">{session.sport}</p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-muted-foreground mb-2">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {formatDate(session.date)}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {session.time}
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {session.location}
                              </div>
                            </div>
                            
                            <div className="text-xs text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded">
                              ✓ Manually checked out (before {session.autoLogoutTime} auto-logout)
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">Duration</p>
                            <p className="font-semibold text-foreground">{session.duration}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Empty State */}
          {sessions.length === 0 && (
            <Card className="bg-gradient-to-br from-card to-secondary/30 border-border">
              <CardContent className="p-12 text-center">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No Sessions Yet</h3>
                <p className="text-muted-foreground">
                  Start using facilities to see your session history here.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewMySessions;