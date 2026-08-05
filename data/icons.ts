import {
  BellRing,
  Bot,
  Database,
  Factory,
  FlaskConical,
  Gamepad2,
  Gauge,
  Grab,
  GraduationCap,
  Lightbulb,
  Network,
  Plane,
  Puzzle,
  RadioTower,
  Satellite,
  Timer,
  Trophy,
  Vibrate,
  Waypoints,
  Wifi,
  Wrench,
  Zap,
  Cpu,
  Layers,
  Rocket,
  BookOpen,
  CircuitBoard,
  Terminal,
  Box,
  Mail,
  MapPin,
  Phone,
  type LucideIcon,
} from "lucide-react";
import { FaTiktok, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import type { IconType } from "react-icons/lib";

export const solutionIcons: Record<string, LucideIcon> = {
  Cpu,
  Layers,
  Rocket,
};

export const columnIcons: Record<string, LucideIcon> = {
  "Embedded Systems": Cpu,
  "IoT & Robotics": Layers,
  "UAV Systems": Rocket,
  "Educational Kits": BookOpen,
  "Embedded Hardware Development": CircuitBoard,
  "Embedded Software Development": Terminal,
  "3D & Mechanical Development": Box,
};

/** Icons for the product page's applications band. See ProductApplication. */
export const applicationIcons: Record<string, LucideIcon> = {
  BellRing,
  BookOpen,
  Bot,
  Cpu,
  Database,
  Factory,
  FlaskConical,
  Gamepad2,
  Gauge,
  Grab,
  GraduationCap,
  Layers,
  Lightbulb,
  Network,
  Plane,
  Puzzle,
  RadioTower,
  Satellite,
  Terminal,
  Timer,
  Trophy,
  Vibrate,
  Waypoints,
  Wifi,
  Wrench,
  Zap,
};

export const contactIcons: Record<string, LucideIcon> = {
  Mail,
  MapPin,
  Phone,
};

export const socialIcons: Record<string, IconType> = {
  FaTiktok,
  FaInstagram,
  FaLinkedinIn,
};
