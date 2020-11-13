// This file is used by Code Analysis to maintain SuppressMessage
// attributes that are applied to this project.
// Project-level suppressions either have no target or are given
// a specific target and scoped to a namespace, type, member, etc.

using System.Diagnostics.CodeAnalysis;

[assembly: SuppressMessage("Design", "CA1056:URI-like properties should not be strings", Justification = "URLs are fine for us")]
[assembly: SuppressMessage("Design", "CA1062:Validate arguments of public methods", Justification = "Training, no production code")]
[assembly: SuppressMessage("Reliability", "CA2007:Consider calling ConfigureAwait on the awaited task", Justification = "No need for ConfigureAwait in ASP.NET Core")]
[assembly: SuppressMessage("Design", "CA1031:Do not catch general exception types", Justification = "Training, no production code")]
